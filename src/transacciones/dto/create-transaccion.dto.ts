import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsEnum, IsDate, IsOptional, IsString, Min } from 'class-validator';

export class CreateTransaccionDto {
  @ApiProperty({ example: 'UUID-v4', description: 'ID único de la transacción' })
  @IsUUID()
  id_transaccion: string;

  @ApiProperty({ example: 1000, description: 'Monto de la transacción', minimum: 1 })
  @IsNumber()
  @Min(1)
  monto: number;

  @ApiProperty({
    example: 'comida',
    description: 'Categoría de la transacción',
    enum: ['comida', 'ropa', 'tecnologia', 'salud', 'educacion', 'transporte', 'entretenimiento', 'servicios', 'otros'],
  })
  @IsEnum(['comida', 'ropa', 'tecnologia', 'salud', 'educacion', 'transporte', 'entretenimiento', 'servicios', 'otros'])
  categoria: string;

  @ApiProperty({ example: '2024-01-01', description: 'Fecha de la transacción' })
  @IsDate()
  fecha: Date;

  @ApiProperty({
    example: 'Pago de comida en restaurante',
    description: 'Descripción de la transacción',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: '12345678-9', description: 'RUT del usuario propietario de la transacción' })
  @IsString()
  rut_usuario: string;
}
