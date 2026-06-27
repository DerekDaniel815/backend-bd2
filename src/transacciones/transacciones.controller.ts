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
import {
  CreateTransaccionDto,
  UpdateTransaccionDto,
} from './dto/transaccion.dto';
import { TransaccionesService } from './transacciones.service';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  create(@Body() dto: CreateTransaccionDto) {
    return this.transaccionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.transaccionesService.findAll();
  }

  @Get('cuenta/:cuentaId')
  findByCuenta(@Param('cuentaId', ParseIntPipe) cuentaId: number) {
    return this.transaccionesService.findByCuenta(cuentaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transaccionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTransaccionDto,
  ) {
    return this.transaccionesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transaccionesService.remove(id);
  }
}
