import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    })
  )
  app.enableCors({
    origin: '*', // Allow all origins for development purposes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,

  });
  await app.listen(process.env.PORT ?? 3003, '0.0.0.0');
}
bootstrap();
