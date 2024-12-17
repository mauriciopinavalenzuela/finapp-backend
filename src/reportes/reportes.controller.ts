import { Controller, Get, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ReportesService } from './reportes.service';
import { ReporteMensualDto } from './dto/reporte-mensual.dto';
import { ReporteRangoMontoDto } from './dto/reporte-rango-monto.dto';
import { ReportePromedioDiarioDto } from './dto/reporte-promedio-diario.dto';

@ApiTags('reporte')
@Controller('reporte')
export class ReportesController {
  private readonly logger = new Logger(ReportesController.name);

  constructor(private readonly reportesService: ReportesService) {}

  @ApiOperation({ summary: 'Obtener el reporte mensual por categoría' })
  @ApiParam({ name: 'rut_usuario', description: 'RUT del usuario' })
  @ApiResponse({ status: 200, description: 'Reporte mensual por categoría', type: [ReporteMensualDto] })
  @Get('mensual_categoria/:rut_usuario')
  getReporteMensual(@Param('rut_usuario') rut_usuario: string) {
    this.logger.log(`🔍 Consultando reporte mensual para el usuario: ${rut_usuario}`);
    return this.reportesService.getReporteMensual(rut_usuario);
  }

  @ApiOperation({ summary: 'Obtener el reporte por rango de montos' })
  @ApiParam({ name: 'categoria', description: 'Categoría de las transacciones' })
  @ApiResponse({ status: 200, description: 'Reporte por rango de montos', type: [ReporteRangoMontoDto] })
  @Get('rango_monto/:categoria')
  getReporteRango(@Param('categoria') categoria: string) {
    this.logger.log(`🔍 Consultando reporte por rango de montos para la categoría: ${categoria}`);
    return this.reportesService.getReporteRangoMonto(categoria);
  }

  @ApiOperation({ summary: 'Obtener el reporte de gasto promedio diario' })
  @ApiParam({ name: 'categoria', description: 'Categoría de las transacciones' })
  @ApiResponse({ status: 200, description: 'Reporte de gasto promedio diario', type: [ReportePromedioDiarioDto] })
  @Get('promedio_diario/:categoria')
  getReportePromedio(@Param('categoria') categoria: string) {
    this.logger.log(`🔍 Consultando reporte de gasto promedio diario para la categoría: ${categoria}`);
    return this.reportesService.getReportePromedioDiario(categoria);
  }
}
