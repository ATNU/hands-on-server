import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.info(process.env.DB_CONNECTION_STRING);
  await app.listen(3000);
}
bootstrap();
