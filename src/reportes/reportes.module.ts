import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { ReporteMensualCategoria } from './entities/reporte-mensual-categoria.entity';
import { ReporteRangoMonto } from './entities/reporte-rango-monto.entity';
import { ReportePromedioDiario } from './entities/reporte-promedio-diario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReporteMensualCategoria,
      ReporteRangoMonto,
      ReportePromedioDiario,
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
