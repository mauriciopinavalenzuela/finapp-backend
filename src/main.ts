import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Configurar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no válidas
      transform: true, // Transforma la entrada al tipo esperado en el DTO
    }),
  );

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('FinApp Backend')
    .setDescription('API para la gestión de transacciones y reportes')
    .setVersion('1.0')
    .addTag('transaccion')
    .addTag('reporte')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Puerto
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Servidor corriendo en http://localhost:${port}/api`);
}
bootstrap();
