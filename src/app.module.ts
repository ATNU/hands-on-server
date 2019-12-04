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
      MongooseModule.forRoot('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' +  + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '?ssl=true', { useNewUrlParser: true, useUnifiedTopology: true }),
      FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
