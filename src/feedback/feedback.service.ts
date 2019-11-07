import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Feedback} from './feedback.interface';
import { CreateFeedbackDto } from './createFeedback.dto';
import {Canvas} from '../canvas/canvas.interface';

@Injectable()
export class FeedbackService {
    constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) {
    }

    async save(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const savedFeedback = new this.feedbackModel(createFeedbackDto);
        return await savedFeedback.save();
}

    async getAllFeedback(): Promise<Feedback[]> {
        return await this.feedbackModel.find().exec();
    }

    async getFeedback(feedbackID): Promise<Feedback> {
        return await this.feedbackModel.findById(feedbackID).exec();
    }
}
