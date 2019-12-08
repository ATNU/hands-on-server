import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';

/*
* DB_HOST     = mongodb
* DB_PORT     = 27001
* DB_NAME     = hands-on-db
* DB_USER     = 
* DB_PASSWORD =
*/

@Module({
  imports: [
      MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }),
      FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
