import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransaccionDocument = Transaccion & Document;

@Schema()
export class Transaccion {
  @Prop({ required: true })
  id_transaccion: string;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true, enum: ["comida", "ropa", "tecnologia", "salud", "educacion", "transporte", "entretenimiento", "servicios", "otros"] })
  categoria: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  rut_usuario: string;
}

export const TransaccionSchema = SchemaFactory.createForClass(Transaccion);
