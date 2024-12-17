import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateTransaccionDto } from './create-transaccion.dto';

export class UpdateTransaccionDto extends PartialType(CreateTransaccionDto) {
  @ApiProperty({
    example: 'Pago editado',
    description: 'Descripción actualizada de la transacción',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
