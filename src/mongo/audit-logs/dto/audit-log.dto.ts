import { IsInt, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  @MaxLength(100)
  entidad: string;

  @IsString()
  @MaxLength(50)
  accion: string;

  @IsOptional()
  @IsString()
  entidadId?: string;

  @IsOptional()
  @IsObject()
  datosAnteriores?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  datosNuevos?: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  ip?: string;
}

export class UpdateAuditLogDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  entidad?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  accion?: string;

  @IsOptional()
  @IsString()
  entidadId?: string;

  @IsOptional()
  @IsObject()
  datosAnteriores?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  datosNuevos?: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  ip?: string;
}
