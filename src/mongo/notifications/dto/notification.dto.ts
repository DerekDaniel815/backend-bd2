import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  usuarioId: number;

  @IsString()
  @MaxLength(150)
  titulo: string;

  @IsString()
  @MaxLength(500)
  mensaje: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  tipo?: string;

  @IsOptional()
  @IsBoolean()
  leida?: boolean;
}

export class UpdateNotificationDto {
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  titulo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  mensaje?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  tipo?: string;

  @IsOptional()
  @IsBoolean()
  leida?: boolean;
}
