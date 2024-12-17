import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReporteMensualCategoria } from './entities/reporte-mensual-categoria.entity';
import { ReporteRangoMonto } from './entities/reporte-rango-monto.entity';
import { ReportePromedioDiario } from './entities/reporte-promedio-diario.entity';
import { ReporteMensualDto } from './dto/reporte-mensual.dto';
import { ReporteRangoMontoDto } from './dto/reporte-rango-monto.dto';
import { ReportePromedioDiarioDto } from './dto/reporte-promedio-diario.dto';

@Injectable()
export class ReportesService {
  private readonly logger = new Logger(ReportesService.name);

  constructor(
    @InjectRepository(ReporteMensualCategoria)
    private mensualRepository: Repository<ReporteMensualCategoria>,

    @InjectRepository(ReporteRangoMonto)
    private rangoRepository: Repository<ReporteRangoMonto>,

    @InjectRepository(ReportePromedioDiario)
    private promedioRepository: Repository<ReportePromedioDiario>,
  ) {}

  // Reporte Mensual por Categoría
  async getReporteMensual(rut_usuario: string): Promise<ReporteMensualDto[]> {
    this.logger.log(`🔍 Consultando reporte mensual para el usuario: ${rut_usuario}`);
    const result = await this.mensualRepository.find({
      where: { rut_usuario },
      order: { anio: 'DESC', mes: 'DESC', total_gasto: 'DESC' },
    });

    if (result.length === 0) {
      this.logger.warn(`⚠️ No se encontraron reportes para el usuario: ${rut_usuario}`);
      throw new NotFoundException(`No se encontraron reportes para el usuario ${rut_usuario}`);
    }

    this.logger.log(`✅ Reporte mensual recuperado con éxito para el usuario: ${rut_usuario}`);
    return result.map((item) => ({
      rut_usuario: item.rut_usuario,
      mes: item.mes,
      anio: item.anio,
      categoria: item.categoria,
      total_gasto: item.total_gasto,
    }));
  }

  // Reporte de Transacciones por Rango de Monto
  async getReporteRangoMonto(categoria: string): Promise<ReporteRangoMontoDto[]> {
    this.logger.log(`🔍 Consultando reporte de rango de montos para la categoría: ${categoria}`);
    const result = await this.rangoRepository.find({
      where: { categoria },
      order: { rango_monto: 'ASC' },
    });

    if (result.length === 0) {
      this.logger.warn(`⚠️ No se encontraron reportes para la categoría: ${categoria}`);
      throw new NotFoundException(`No se encontraron reportes para la categoría ${categoria}`);
    }

    this.logger.log(`✅ Reporte de rango de montos recuperado con éxito para la categoría: ${categoria}`);
    return result.map((item) => ({
      categoria: item.categoria,
      rango_monto: item.rango_monto,
      cantidad_transacciones: item.cantidad_transacciones,
    }));
  }

  // Reporte de Gasto Promedio Diario
  async getReportePromedioDiario(categoria: string): Promise<ReportePromedioDiarioDto[]> {
    this.logger.log(`🔍 Consultando reporte de gasto promedio diario para la categoría: ${categoria}`);
    const result = await this.promedioRepository.find({
      where: { categoria },
      order: { promedio_diario: 'DESC' },
    });

    if (result.length === 0) {
      this.logger.warn(`⚠️ No se encontraron reportes para la categoría: ${categoria}`);
      throw new NotFoundException(`No se encontraron reportes para la categoría ${categoria}`);
    }

    this.logger.log(`✅ Reporte de gasto promedio diario recuperado con éxito para la categoría: ${categoria}`);
    return result.map((item) => ({
      rut_usuario: item.rut_usuario, // Ajustado para coincidir con el DTO
      categoria: item.categoria,
      promedio_diario: item.promedio_diario,
    }));
  }
}
