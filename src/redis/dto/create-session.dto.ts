import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  token: string;

  @IsInt()
  @Min(1)
  usuarioId: number;

  @IsOptional()
  @IsInt()
  @Min(60)
  ttlSeconds?: number;
}
