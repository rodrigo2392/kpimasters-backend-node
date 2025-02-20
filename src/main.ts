import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import * as basicAuth from 'express-basic-auth';

const logger = new Logger('APP', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('KPI Master api')
    .setDescription('KPI Master api description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: { admin: 'kpimasters2025!' },
    }),
  );
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() =>
    logger.log('Api is running on port ' + (process.env.PORT ?? 3000)),
  )
  .catch((err) => logger.error(err));
