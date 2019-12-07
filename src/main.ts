import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.info('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' +  + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '?ssl=true');
  await app.listen(3000);
}
bootstrap();
