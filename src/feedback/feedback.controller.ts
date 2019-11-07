import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './createFeedback.dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {

    }

    @Post('save')
    async saveFeedback(@Res() res, @Body() createFeedbackDto: CreateFeedbackDto) {
        const feedback = await this.feedbackService.save(createFeedbackDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Feedback saved',
            feedback,
        });
    }
}
