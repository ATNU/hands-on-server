import {Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './createFeedback.dto';

@Controller('api/feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {

    }

    // save
    @Post('save')
    async saveFeedback(@Res() res, @Body() createFeedbackDto: CreateFeedbackDto) {
        const feedback = await this.feedbackService.save(createFeedbackDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Feedback saved',
            feedback,
        });
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
