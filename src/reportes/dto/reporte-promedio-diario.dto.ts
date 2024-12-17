import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Matches } from 'class-validator';

export class ReportePromedioDiarioDto {
  @ApiProperty({ example: '12345678-9', description: 'RUT del usuario' })
  @IsString()
  @Matches(/^\d{7,8}-\d$/, { message: 'Formato de RUT inválido. Ejemplo: 12345678-9' })
  rut_usuario: string;

  @ApiProperty({ example: 'comida', description: 'Categoría de gasto' })
  @IsString()
  categoria: string;

  @ApiProperty({ example: 150000, description: 'Promedio del gasto diario' })
  @IsNumber()
  @Min(0)
  promedio_diario: number;
}
