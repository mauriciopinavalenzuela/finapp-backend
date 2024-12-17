import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReporteMensualCategoria } from '../reportes/entities/reporte-mensual-categoria.entity';

@Injectable()
export class SincronizacionService {
  private readonly logger = new Logger(SincronizacionService.name);

  constructor(
    @InjectRepository(ReporteMensualCategoria)
    private mensualRepository: Repository<ReporteMensualCategoria>,
  ) {}

  // Método para consolidar reportes en MySQL
  async consolidarReporteMensual(transaccion: any) {
    const { rut_usuario, categoria, monto, fecha } = transaccion;

    this.logger.debug(`🔄 Iniciando sincronización para el usuario ${rut_usuario}, categoría ${categoria}.`);
    this.logger.debug(`📅 Fecha de transacción: ${fecha}, Monto: ${monto}`);

    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    this.logger.debug(`🔍 Buscando reporte existente para mes: ${mes}, año: ${anio}...`);

    const reporteExistente = await this.mensualRepository.findOne({
      where: { rut_usuario, categoria, mes, anio },
    });

    if (reporteExistente) {
      this.logger.log(`✅ Reporte existente encontrado. Actualizando total de gasto.`);
      reporteExistente.total_gasto += monto;
      await this.mensualRepository.save(reporteExistente);
      this.logger.debug(`💾 Reporte actualizado con éxito. Nuevo total: ${reporteExistente.total_gasto}`);
    } else {
      this.logger.log(`🆕 No se encontró reporte. Creando uno nuevo.`);
      const nuevoReporte = this.mensualRepository.create({
        rut_usuario,
        categoria,
        total_gasto: monto,
        mes,
        anio,
      });
      await this.mensualRepository.save(nuevoReporte);
      this.logger.debug(`💾 Nuevo reporte guardado con éxito.`);
    }

    this.logger.debug(`🔄 Sincronización completada para usuario ${rut_usuario}, categoría ${categoria}.`);
  }
}
