import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function loadEnvVars() {
  const result = await dotenv.config();

  if (result.error) {
    throw result.error;
  }

  console.log(result.parsed);
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.info(process.env.DB_CONNECTION_STRING);
  await app.listen(3000);
}

loadEnvVars().then(() => {
  bootstrap();
});
