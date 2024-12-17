import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Matches } from 'class-validator';

export class ReporteRangoMontoDto {
  @ApiProperty({ example: 'comida', description: 'Categoría de las transacciones' })
  @IsString()
  categoria: string;

  @ApiProperty({ example: '5.001-30.000', description: 'Rango de montos (formato numérico)' })
  @IsString()
  @Matches(/^\d{1,3}(\.\d{3})?-\d{1,3}(\.\d{3})?$/, {
    message: 'Formato inválido para el rango de montos. Ejemplo: 5.001-30.000',
  })
  rango_monto: string;

  @ApiProperty({ example: 15, description: 'Cantidad de transacciones en el rango' })
  @IsNumber()
  @Min(0, { message: 'La cantidad de transacciones debe ser mayor o igual a 0' })
  cantidad_transacciones: number;
}
