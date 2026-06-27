import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { serializePrisma } from '../common/utils/serialize.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUsuarioDto) {
    try {
      const usuario = await this.prisma.usuarios.create({ data: dto });
      console.log('usuario', usuario);
      return serializePrisma(usuario);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }

  async findAll() {
    const usuarios = await this.prisma.usuarios.findMany({
      include: { cuentas: true },
      orderBy: { id: 'asc' },
    });
    return serializePrisma(usuarios);
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
      include: { cuentas: true },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return serializePrisma(usuario);
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    try {
      const usuario = await this.prisma.usuarios.update({
        where: { id },
        data: dto,
      });
      return serializePrisma(usuario);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Usuario ${id} no encontrado`);
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.usuarios.delete({ where: { id } });
      return { message: 'Usuario eliminado', id };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Usuario ${id} no encontrado`);
      }
      throw error;
    }
  }
}
