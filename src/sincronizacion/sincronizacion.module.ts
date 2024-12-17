import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SincronizacionService } from './sincronizacion.service';
import { ReporteMensualCategoria } from '../reportes/entities/reporte-mensual-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReporteMensualCategoria])],
  providers: [SincronizacionService],
  exports: [SincronizacionService],
})
export class SincronizacionModule {}
