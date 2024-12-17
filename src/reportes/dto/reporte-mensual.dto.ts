import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, Min, Max, Matches } from 'class-validator';

export class ReporteMensualDto {
  @ApiProperty({ example: '12345678-9', description: 'RUT del usuario' })
  @IsString()
  @Matches(/^\d{7,8}-\d$/) // Validación simple de formato RUT
  rut_usuario: string;

  @ApiProperty({ example: 5, description: 'Mes del reporte' })
  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;

  @ApiProperty({ example: 2024, description: 'Año del reporte' })
  @IsInt()
  @Min(2000)
  @Max(new Date().getFullYear())
  anio: number;

  @ApiProperty({ example: 'comida', description: 'Categoría de gasto' })
  @IsString()
  categoria: string;

  @ApiProperty({ example: 150000, description: 'Total del gasto acumulado' })
  @IsNumber()
  @Min(0)
  total_gasto: number;
}
