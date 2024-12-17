import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaccion, TransaccionDocument } from './entities/transaccion.entity';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { SincronizacionService } from '../sincronizacion/sincronizacion.service';

@Injectable()
export class TransaccionesService {
  private readonly logger = new Logger(TransaccionesService.name);

  constructor(
    @InjectModel(Transaccion.name)
    private transaccionModel: Model<TransaccionDocument>,
    private readonly sincronizacionService: SincronizacionService,
  ) {}

  // Crear transacciones en lote
  async createBulk(createTransaccionDto: CreateTransaccionDto[]) {
    this.logger.log(`🚀 Iniciando creación de ${createTransaccionDto.length} transacciones en lote.`);
    const result = await this.transaccionModel.insertMany(createTransaccionDto);
    this.logger.log(`✅ Se crearon ${result.length} transacciones.`);

    for (const transaccion of result) {
      this.logger.debug(`🔄 Sincronizando transacción con ID: ${transaccion._id}`);
      await this.sincronizacionService.consolidarReporteMensual(transaccion);
    }

    this.logger.log(`✅ Sincronización completada para todas las transacciones.`);
    return result;
  }

  // Obtener transacciones paginadas
  async findAllPaginated(page = 1, limit = 10, sort = 'fecha') {
    this.logger.log(`📄 Recuperando transacciones - Página: ${page}, Límite: ${limit}, Orden: ${sort}`);
    const skip = (page - 1) * limit;

    const data = await this.transaccionModel
      .find()
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.transaccionModel.countDocuments();
    this.logger.log(`✅ Recuperadas ${data.length} transacciones de un total de ${total}.`);

    return { data, total, page, limit };
  }

  // Obtener transacciones por usuario
  async findByUser(rut_usuario: string) {
    this.logger.log(`🔍 Buscando transacciones para el usuario: ${rut_usuario}`);
    const result = await this.transaccionModel.find({ rut_usuario }).exec();

    this.logger.log(
      result.length > 0
        ? `✅ Se encontraron ${result.length} transacciones para el usuario ${rut_usuario}.`
        : `⚠ No se encontraron transacciones para el usuario ${rut_usuario}.`,
    );

    return result;
  }

  // Actualizar una transacción
  async update(id: string, updateTransaccionDto: UpdateTransaccionDto) {
    this.logger.log(`🛠 Actualizando la transacción con ID: ${id}`);
    const result = await this.transaccionModel.findByIdAndUpdate(id, updateTransaccionDto, {
      new: true,
    });

    if (!result) {
      this.logger.warn(`⚠ La transacción con ID: ${id} no fue encontrada.`);
      throw new NotFoundException('Transacción no encontrada');
    }

    this.logger.debug(`🔄 Sincronizando transacción actualizada con ID: ${id}`);
    await this.sincronizacionService.consolidarReporteMensual(result);

    this.logger.log(`✅ Transacción con ID: ${id} actualizada y sincronizada.`);
    return result;
  }

  // Eliminar una transacción
  async remove(id: string) {
    this.logger.log(`🗑 Eliminando la transacción con ID: ${id}`);
    const result = await this.transaccionModel.findByIdAndDelete(id);

    if (!result) {
      this.logger.warn(`⚠ La transacción con ID: ${id} no fue encontrada.`);
      throw new NotFoundException('Transacción no encontrada');
    }

    this.logger.log(`✅ Transacción con ID: ${id} eliminada con éxito.`);
    return result;
  }
}
