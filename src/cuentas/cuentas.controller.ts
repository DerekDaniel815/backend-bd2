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
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto, UpdateCuentaDto } from './dto/cuenta.dto';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  create(@Body() dto: CreateCuentaDto) {
    return this.cuentasService.create(dto);
  }

  @Get()
  findAll() {
    return this.cuentasService.findAll();
  }

  @Get(':id/saldo')
  getSaldo(@Param('id', ParseIntPipe) id: number) {
    return this.cuentasService.getSaldo(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cuentasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCuentaDto,
  ) {
    return this.cuentasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cuentasService.remove(id);
  }
}
