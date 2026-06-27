import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaGastoDto {
  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @MaxLength(20)
  tipo: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;
}

export class UpdateCategoriaGastoDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;
}
