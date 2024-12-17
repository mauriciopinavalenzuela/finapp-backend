import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reporte_mensual_categoria')
export class ReporteMensualCategoria {
  @PrimaryColumn({ type: 'varchar', length: 12 })
  rut_usuario: string; // Parte de la clave primaria

  @PrimaryColumn({ type: 'int' })
  mes: number; // Parte de la clave primaria

  @PrimaryColumn({ type: 'int' })
  anio: number; // Parte de la clave primaria

  @PrimaryColumn({ type: 'varchar', length: 50 })
  categoria: string; // Parte de la clave primaria

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total_gasto: number; // Ajustado para mayor precisión
}
