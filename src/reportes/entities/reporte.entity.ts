import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reporte_mensual_categoria')
export class ReporteMensualCategoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rut_usuario: string;

  @Column()
  mes: number;

  @Column()
  anio: number;

  @Column()
  categoria: string;

  @Column('float')
  total_gasto: number;
}

@Entity('reporte_rango_monto')
export class ReporteRangoMonto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria: string;

  @Column()
  rango_monto: string;

  @Column('int')
  cantidad_transacciones: number;
}

@Entity('reporte_promedio_diario')
export class ReportePromedioDiario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: string;

  @Column()
  categoria: string;

  @Column('float')
  promedio_diario: number;
}
