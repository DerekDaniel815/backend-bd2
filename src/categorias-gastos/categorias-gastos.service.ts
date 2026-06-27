import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { serializePrisma } from '../common/utils/serialize.util';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCategoriaGastoDto,
  UpdateCategoriaGastoDto,
} from './dto/categoria-gasto.dto';

@Injectable()
export class CategoriasGastosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoriaGastoDto) {
    const categoria = await this.prisma.categorias_gastos.create({ data: dto });
    return serializePrisma(categoria);
  }

  async findAll() {
    const categorias = await this.prisma.categorias_gastos.findMany({
      include: { transacciones: true },
      orderBy: { id: 'asc' },
    });
    return serializePrisma(categorias);
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categorias_gastos.findUnique({
      where: { id },
      include: { transacciones: true },
    });
    if (!categoria) {
      throw new NotFoundException(`Categoría ${id} no encontrada`);
    }
    return serializePrisma(categoria);
  }

  async update(id: number, dto: UpdateCategoriaGastoDto) {
    try {
      const categoria = await this.prisma.categorias_gastos.update({
        where: { id },
        data: dto,
      });
      return serializePrisma(categoria);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Categoría ${id} no encontrada`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.categorias_gastos.delete({ where: { id } });
      return { message: 'Categoría eliminada', id };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Categoría ${id} no encontrada`);
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException(
          `No se puede eliminar la categoría ${id} porque tiene transacciones asociadas`,
        );
      }
      throw error;
    }
  }
}
