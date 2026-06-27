import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { RedisService } from './redis.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  async create(@Body() dto: CreateSessionDto) {
    await this.redisService.setSession(
      dto.token,
      dto.usuarioId,
      dto.ttlSeconds,
    );
    return { message: 'Sesión creada', token: dto.token };
  }

  @Get(':token')
  async findOne(@Param('token') token: string) {
    const userId = await this.redisService.getSession(token);
    if (!userId) {
      throw new NotFoundException('Sesión no encontrada o expirada');
    }
    return { token, usuarioId: userId };
  }

  @Delete(':token')
  async remove(@Param('token') token: string) {
    await this.redisService.deleteSession(token);
    return { message: 'Sesión eliminada', token };
  }
}
