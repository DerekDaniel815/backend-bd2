import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { serializePrisma } from '../common/utils/serialize.util';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateCuentaDto, UpdateCuentaDto } from './dto/cuenta.dto';

@Injectable()
export class CuentasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateCuentaDto) {
    const cuenta = await this.prisma.cuentas.create({ data: dto });
    const serialized = serializePrisma(cuenta);
    await this.redisService.setSaldoCache(
      cuenta.id,
      String(serialized.saldo_actual ?? 0),
    );
    return serialized;
  }

  async findAll() {
    const cuentas = await this.prisma.cuentas.findMany({
      include: { usuarios: true, transacciones: true },
      orderBy: { id: 'asc' },
    });
    return serializePrisma(cuentas);
  }

  async findOne(id: number) {
    const cuenta = await this.prisma.cuentas.findUnique({
      where: { id },
      include: { usuarios: true, transacciones: true },
    });
    if (!cuenta) {
      throw new NotFoundException(`Cuenta ${id} no encontrada`);
    }
    return serializePrisma(cuenta);
  }

  async getSaldo(id: number) {
    const cached = await this.redisService.getSaldoCache(id);
    if (cached !== null) {
      return { cuentaId: id, saldo_actual: Number(cached), source: 'cache' };
    }

    const cuenta = await this.prisma.cuentas.findUnique({
      where: { id },
      select: { id: true, saldo_actual: true },
    });
    if (!cuenta) {
      throw new NotFoundException(`Cuenta ${id} no encontrada`);
    }

    const saldo = Number(cuenta.saldo_actual ?? 0);
    await this.redisService.setSaldoCache(id, String(saldo));
    return { cuentaId: id, saldo_actual: saldo, source: 'database' };
  }

  async update(id: number, dto: UpdateCuentaDto) {
    try {
      const cuenta = await this.prisma.cuentas.update({
        where: { id },
        data: dto,
      });
      const serialized = serializePrisma(cuenta);
      await this.redisService.setSaldoCache(
        id,
        String(serialized.saldo_actual ?? 0),
      );
      return serialized;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Cuenta ${id} no encontrada`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.cuentas.delete({ where: { id } });
      await this.redisService.invalidateSaldoCache(id);
      return { message: 'Cuenta eliminada', id };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Cuenta ${id} no encontrada`);
      }
      throw error;
    }
  }
}
