import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { Transaccion, TransaccionSchema } from './entities/transaccion.entity';
import { SincronizacionModule } from '../sincronizacion/sincronizacion.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaccion.name, schema: TransaccionSchema }]),
    SincronizacionModule, // Importa el módulo de sincronización
  ],
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
})
export class TransaccionesModule {}
