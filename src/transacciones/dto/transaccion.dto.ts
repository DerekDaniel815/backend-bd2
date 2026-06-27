import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateTransaccionDto {
  @IsInt()
  @Min(1)
  cuenta_id: number;

  @IsInt()
  @Min(1)
  categoria_id: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  monto: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;
}

export class UpdateTransaccionDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  cuenta_id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoria_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  monto?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;
}
