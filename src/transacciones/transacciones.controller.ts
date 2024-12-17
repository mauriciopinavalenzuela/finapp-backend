import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('transaccion')
@Controller('transacciones')
export class TransaccionesController {
  private readonly logger = new Logger(TransaccionesController.name);

  constructor(private readonly transaccionesService: TransaccionesService) {}

  // Crear transacciones en lote
  @Post('bulk')
  @ApiOperation({ summary: 'Crear transacciones en lote' })
  async createBulk(@Body() createTransaccionDto: CreateTransaccionDto[]) {
    this.logger.log(`🔄 Solicitud recibida para crear ${createTransaccionDto.length} transacciones en lote`);
    const result = await this.transaccionesService.createBulk(createTransaccionDto);
    this.logger.log('✅ Transacciones creadas y sincronizadas con éxito');
    return result;
  }

  // Obtener todas las transacciones con paginación
  @Get()
  @ApiOperation({ summary: 'Obtener todas las transacciones con paginación' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sort', required: false, example: 'fecha' })
  async findAllPaginated(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: string,
  ) {
    this.logger.log(`📄 Solicitud recibida para obtener transacciones - Página: ${page}, Límite: ${limit}`);
    const result = await this.transaccionesService.findAllPaginated(Number(page), Number(limit), sort);
    this.logger.log(`✅ Se recuperaron ${result.data.length} transacciones`);
    return result;
  }

  // Obtener transacciones por usuario
  @Get('usuario/:rut_usuario')
  @ApiOperation({ summary: 'Obtener transacciones de un usuario específico' })
  async findByUser(@Param('rut_usuario') rut_usuario: string) {
    this.logger.log(`🔍 Solicitud recibida para obtener transacciones del usuario: ${rut_usuario}`);
    const result = await this.transaccionesService.findByUser(rut_usuario);
    this.logger.log(`✅ Se recuperaron ${result.length} transacciones para el usuario ${rut_usuario}`);
    return result;
  }

  // Actualizar una transacción
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una transacción existente' })
  async update(@Param('id') id: string, @Body() updateTransaccionDto: UpdateTransaccionDto) {
    this.logger.log(`🛠 Solicitud recibida para actualizar la transacción con ID: ${id}`);
    const result = await this.transaccionesService.update(id, updateTransaccionDto);
    this.logger.log(`✅ Transacción con ID: ${id} actualizada exitosamente`);
    return result;
  }

  // Eliminar una transacción
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una transacción' })
  async remove(@Param('id') id: string) {
    this.logger.log(`🗑 Solicitud recibida para eliminar la transacción con ID: ${id}`);
    const result = await this.transaccionesService.remove(id);
    this.logger.log(`✅ Transacción con ID: ${id} eliminada exitosamente`);
    return result;
  }
}
