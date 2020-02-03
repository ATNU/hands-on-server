import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
  } catch (err) {
    console.log(err);
    console.log(process.env.DB_CONNECTION_STRING);
  }
}
bootstrap();
