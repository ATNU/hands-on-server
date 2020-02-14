import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {FeedbackSchema} from './feedback.schema';


@Module({
  imports: [ MongooseModule.forFeature([{name: 'Feedback', schema: FeedbackSchema}])],
  providers: [FeedbackService],
  controllers: [FeedbackController],
    exports: [MongooseModule, FeedbackService],
})
export class FeedbackModule {}
