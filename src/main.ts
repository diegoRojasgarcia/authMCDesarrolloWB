import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/filter-exception.http';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  app.enableCors();
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
