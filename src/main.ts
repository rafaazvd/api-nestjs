import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext({
    storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
  });

  const app = await NestFactory.create(AppModule);

  const origin = process.env.CORS_ORIGIN_WHITELIST;
  app.enableCors({ origin });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API - Layered Architecture')
    .setDescription('NESTJS API by Rafael Azevedo.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
