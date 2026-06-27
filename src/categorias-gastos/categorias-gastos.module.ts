import { Module } from '@nestjs/common';
import { CategoriasGastosController } from './categorias-gastos.controller';
import { CategoriasGastosService } from './categorias-gastos.service';

@Module({
  controllers: [CategoriasGastosController],
  providers: [CategoriasGastosService],
  exports: [CategoriasGastosService],
})
export class CategoriasGastosModule {}
