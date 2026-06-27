import { IsInt, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class CreateAuthTokenDto {
  @IsString()
  token: string;

  @IsObject()
  payload: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  @Min(60)
  ttlSeconds?: number;
}
