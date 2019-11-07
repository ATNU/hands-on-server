import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Feedback} from './feedback.interface';
import { CreateFeedbackDto } from './createFeedback.dto';

@Injectable()
export class FeedbackService {
    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) {
    }

    async save(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const savedFeedback = new this.feedbackModel(createFeedbackDto);
        return await savedFeedback.save();
}

}
