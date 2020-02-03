import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {Page} from './page.interface';
import {PageService} from './page.service';
import {CreateFeedbackDto} from '../feedback/createFeedback.dto';
import {CreatePageDto} from './createPage.dto';
import {} from '../middleware/auth.middleware';

@Controller('api/page')
export class PageController {
    constructor(
        private pageService: PageService,
    ) {
    }

    @Post('save')
    async savePage(@Res() res, @Body() createPageDto: CreatePageDto) {
            const feedback = await this.pageService.save(createPageDto);
            return res.status(HttpStatus.CREATED).json({
                message: 'Page saved',
            });
        }

    // todo get most recently saved version of page number x
    @Get('resume')
    async getMostRecentPage(@Res() res, @Req() req) {
        console.log('page');
    }
}

