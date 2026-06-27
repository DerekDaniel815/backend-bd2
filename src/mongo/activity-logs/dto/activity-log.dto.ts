import { IsInt, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateActivityLogDto {
  @IsInt()
  usuarioId: number;

  @IsString()
  @MaxLength(100)
  accion: string;

  @IsOptional()
  @IsString()
  endpoint?: string;

  @IsOptional()
  @IsString()
  metodo?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateActivityLogDto {
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accion?: string;

  @IsOptional()
  @IsString()
  endpoint?: string;

  @IsOptional()
  @IsString()
  metodo?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
