import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriasGastosService } from './categorias-gastos.service';
import {
  CreateCategoriaGastoDto,
  UpdateCategoriaGastoDto,
} from './dto/categoria-gasto.dto';

@Controller('categorias-gastos')
export class CategoriasGastosController {
  constructor(
    private readonly categoriasGastosService: CategoriasGastosService,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoriaGastoDto) {
    return this.categoriasGastosService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoriasGastosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasGastosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaGastoDto,
  ) {
    return this.categoriasGastosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasGastosService.remove(id);
  }
}
