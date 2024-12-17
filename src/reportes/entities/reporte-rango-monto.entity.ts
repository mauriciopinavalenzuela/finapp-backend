import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reporte_rango_monto')
export class ReporteRangoMonto {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  categoria: string; // Parte de la clave primaria compuesta

  @PrimaryColumn({ type: 'varchar', length: 20 })
  rango_monto: string; // Parte de la clave primaria compuesta

  @Column({ type: 'int' })
  cantidad_transacciones: number;
}
