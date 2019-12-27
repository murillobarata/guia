import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // console.log(join(process.cwd() + '/../images/'));
  app.use(express.static(join(process.cwd() + '/../static/')));
  await app.listen(3000);
}
bootstrap();
