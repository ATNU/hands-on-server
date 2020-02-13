import {Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './createFeedback.dto';
import * as mongoose from 'mongoose';

@Controller('api/feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {

    }

    // save feedback
    @Post('save')
    async saveFeedback(@Res() res, @Req() req, @Body() createFeedbackDto: CreateFeedbackDto) {

        // check for required fields (radio buttons)
        if (createFeedbackDto.q1Check === undefined || createFeedbackDto.q2Check === undefined || createFeedbackDto.q3Check === undefined || createFeedbackDto.device === undefined || createFeedbackDto.job === undefined) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Missing required fields',
            });
        }

        if (mongoose.Types.ObjectId.isValid(req.body.jwt.id)) {
            const mongoUserId = mongoose.Types.ObjectId(req.body.jwt.id);
            const feedbackToSave = {
                userId: mongoUserId,
               q1Check: createFeedbackDto.q1Check,
                q1Text: createFeedbackDto.q1Text,
                 q2Check: createFeedbackDto.q2Check,
                q2Text: createFeedbackDto.q2Text,
                q3Check: createFeedbackDto.q3Check,
                q3Text: createFeedbackDto.q3Text,
                job: createFeedbackDto.job,
                jobText: createFeedbackDto.jobText,
                device: createFeedbackDto.device,
                deviceText: createFeedbackDto.deviceText,
                timestamp: Date.now(),
            };

            const feedback = await this.feedbackService.save(feedbackToSave);
            return res.status(HttpStatus.CREATED).json({
                message: 'Feedback saved',
            });
        }
    }
    @Get('all')
    async getAllFeedback(@Res() res) {
        const feeds = await this.feedbackService.getAllFeedback();
        return res.status(HttpStatus.OK).json(feeds);
    }
    @Get(':feedbackID')
    async getFeedback(@Res() res, @Param('feedbackID') feedbackID) {
        const feedback = await this.feedbackService.getFeedback(feedbackID);
        if (!feedback) {
            throw new NotFoundException('feedback does not exist');
        }
        return res.status(HttpStatus.OK).json(feedback);
    }


}
