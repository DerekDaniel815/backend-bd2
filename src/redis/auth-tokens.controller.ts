import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAuthTokenDto } from './dto/create-auth-token.dto';
import { RedisService } from './redis.service';

@Controller('auth-tokens')
export class AuthTokensController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  async create(@Body() dto: CreateAuthTokenDto) {
    await this.redisService.setAuthToken(
      dto.token,
      dto.payload,
      dto.ttlSeconds,
    );
    return { message: 'Token de autenticación almacenado', token: dto.token };
  }

  @Get(':token')
  async findOne(@Param('token') token: string) {
    const payload = await this.redisService.getAuthToken(token);
    if (!payload) {
      throw new NotFoundException('Token no encontrado o expirado');
    }
    return { token, payload };
  }

  @Delete(':token')
  async remove(@Param('token') token: string) {
    await this.redisService.deleteAuthToken(token);
    return { message: 'Token eliminado', token };
  }
}
