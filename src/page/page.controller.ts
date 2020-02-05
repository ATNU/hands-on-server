import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from '@nestjs/common';
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

// todo get most recently saved version of page
    @Get('/:pageNo')
    async getPage(@Res() res, @Req() req, @Param('pageNo') pageNo) {
    console.log('get page reached');
    const pages = await this.pageService.getPagesForUserForPageNo(pageNo, req.body.jwt.id);

    // if there's no saved pages then respond
        if (pages.length === 0) {
            return res.status(HttpStatus.OK).json({
                page: pages,
                message: 'user has not saved this page yet',
            });
        }

    // if there's only 1 saved page then return it
        if (pages.length === 1) {
                return res.status(HttpStatus.OK).json({
                    page: pages[0],
                });

        } else {

            // find most recently saved page
            const page = await this.pageService.getMostRecentPage(pages);
            return res.status(HttpStatus.OK).json({
                page,
            });
        }

    }

    // todo version that updates if that page has already been saved
    @Post('save')
    async savePage(@Res() res, @Req() req, @Body() createPageDto: CreatePageDto) {

        if (mongoose.Types.ObjectId.isValid(req.body.jwt.id)) {
            const mongoUserId = mongoose.Types.ObjectId(req.body.jwt.id);
            const pageToSave = {
                userId: mongoUserId,
                pageNo: createPageDto.pageNo,
                svg: createPageDto.svg,
                json: createPageDto.json,
                timestamp: Date.now(),
            };

            const page = await this.pageService.save(pageToSave);
            return res.status(HttpStatus.CREATED).json({
                message: 'Page saved',
            });
        }
    }

    // return page object of the furthest saved page
    @Get('furthestPage')
    async getMostRecentPage(@Res() res, @Req() req) {

        console.log('furthest page route');


        // if there's no pages for this user then respond
        const pagesForUser = await this.pageService.getAllForUser(req.body.jwt.id);
        if (pagesForUser.length === 0) {
            return res.status(HttpStatus.OK).json({
                page: pagesForUser,
                message: 'no saved pages',
            });
        }
        
        // get the number of the furthest page that user has saved
        const highestPageNo = await this.pageService.getHighestPageNo(await this.pageService.getAllForUser(req.body.jwt.id));
        console.log('highestPageNo ' + highestPageNo);
        // get all saved pages for that pageNo
        const savedPages = await this.pageService.getPagesForUserForPageNo(highestPageNo, req.body.jwt.id);
        console.log('savedPages' + savedPages);

        // if there's only 1 page return that
        if (savedPages.length === 1 ) {
            console.log('return single result');
            return res.status(HttpStatus.OK).json({
                page: savedPages[0],
            });
        } else {
console.log('find most recent');
            // find most recent page saved for the pageno
            const mostRecent = await this.pageService.getMostRecentPage(savedPages);
            console.log('mostRecent ' + mostRecent);
            return res.status(HttpStatus.OK).json({
                page: mostRecent,
            });
        }

    }

}

