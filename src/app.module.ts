import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CanvasModule } from './canvas/canvas.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/hands-on-db-test', { useNewUrlParser: true, useUnifiedTopology: true }),
      FeedbackModule,
      CanvasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
