import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { serializePrisma } from '../common/utils/serialize.util';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import {
  CreateTransaccionDto,
  UpdateTransaccionDto,
} from './dto/transaccion.dto';

@Injectable()
export class TransaccionesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  private async invalidateSaldoForCuenta(cuentaId?: number | null) {
    if (cuentaId) {
      await this.redisService.invalidateSaldoCache(cuentaId);
    }
  }

  async create(dto: CreateTransaccionDto) {
    const transaccion = await this.prisma.transacciones.create({
      data: {
        ...dto,
        fecha: dto.fecha ? new Date(dto.fecha) : undefined,
      },
      include: { cuentas: true, categorias_gastos: true },
    });
    await this.invalidateSaldoForCuenta(transaccion.cuenta_id);
    return serializePrisma(transaccion);
  }

  async findAll() {
    const transacciones = await this.prisma.transacciones.findMany({
      include: { cuentas: true, categorias_gastos: true },
      orderBy: { id: 'desc' },
    });
    return serializePrisma(transacciones);
  }

  async findByCuenta(cuentaId: number) {
    const transacciones = await this.prisma.transacciones.findMany({
      where: { cuenta_id: cuentaId },
      include: { categorias_gastos: true },
      orderBy: { fecha: 'desc' },
    });
    return serializePrisma(transacciones);
  }

  async findOne(id: number) {
    const transaccion = await this.prisma.transacciones.findUnique({
      where: { id },
      include: { cuentas: true, categorias_gastos: true },
    });
    if (!transaccion) {
      throw new NotFoundException(`Transacción ${id} no encontrada`);
    }
    return serializePrisma(transaccion);
  }

  async update(id: number, dto: UpdateTransaccionDto) {
    const existing = await this.prisma.transacciones.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Transacción ${id} no encontrada`);
    }

    const transaccion = await this.prisma.transacciones.update({
      where: { id },
      data: {
        ...dto,
        fecha: dto.fecha ? new Date(dto.fecha) : undefined,
      },
      include: { cuentas: true, categorias_gastos: true },
    });

    await this.invalidateSaldoForCuenta(existing.cuenta_id);
    await this.invalidateSaldoForCuenta(transaccion.cuenta_id);
    return serializePrisma(transaccion);
  }

  async remove(id: number) {
    const existing = await this.prisma.transacciones.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Transacción ${id} no encontrada`);
    }

    await this.prisma.transacciones.delete({ where: { id } });
    await this.invalidateSaldoForCuenta(existing.cuenta_id);
    return { message: 'Transacción eliminada', id };
  }
}
