import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/hands-on-db', { useNewUrlParser: true, useUnifiedTopology: true }),
      FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
