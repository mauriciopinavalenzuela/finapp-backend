import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reporte_promedio_diario')
export class ReportePromedioDiario {
  @PrimaryColumn({ type: 'varchar', length: 12 })
  rut_usuario: string; // Cambiado de 'usuario_id' a 'rut_usuario'

  @PrimaryColumn({ type: 'varchar', length: 50 })
  categoria: string; // Parte de la clave primaria compuesta

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  promedio_diario: number; // Ajustado según el tipo de dato en la base de datos
}
