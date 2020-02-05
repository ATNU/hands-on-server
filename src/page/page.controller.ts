import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {Page} from './page.interface';
import {PageService} from './page.service';
import {CreateFeedbackDto} from '../feedback/createFeedback.dto';
import {CreatePageDto} from './createPage.dto';
import {} from '../middleware/auth.middleware';
import * as mongoose from 'mongoose';

@Controller('api/page')
export class PageController {
    constructor(
        private pageService: PageService,
    ) {
    }
// todo
    // get most recently saved version of page
    @Get()
    async getPage() {

    }

// todo
    @Post('save')
    async savePage(@Res() res, @Req() req, @Body() createPageDto: CreatePageDto) {
        console.log('sent page ' + JSON.stringify(createPageDto));

        if (mongoose.Types.ObjectId.isValid(req.body.jwt.id) ) {
            console.log('invalid user ID');
            const mongoUserId = mongoose.Types.ObjectId(req.body.jwt.id);

            console.log('mgId ' + mongoUserId);
            const pageToSave = {
                userId: mongoUserId,
                pageNo: createPageDto.pageNo,
                svg: createPageDto.svg,
                json: createPageDto.json,
                timestamp: Date.now(),
            };

            console.log('new page ' + JSON.stringify(pageToSave));
            const page = await this.pageService.save(pageToSave);
            return res.status(HttpStatus.CREATED).json({
                message: 'Page saved',
            });
        }
        }

   // todo
    @Get('resume')
    async getMostRecentPage(@Res() res, @Req() req) {
        console.log('page');
        console.log(req.body.id);
    }



}

