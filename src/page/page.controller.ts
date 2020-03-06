import {Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {Page} from './page.interface';
import {PageService} from './page.service';
import {CreateFeedbackDto} from '../feedback/createFeedback.dto';
import {CreatePageDto} from './createPage.dto';
import {} from '../middleware/auth.middleware';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

@Controller('api/page')
export class PageController {
    constructor(
        private pageService: PageService,
    ) {
    }




// prefer save or update to just save
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
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Invalid token',
            });
        }
    }

    @Post('sou')
    async saveOrUpdatePage(@Res() res, @Req() req) {
        console.log('save or update route');
        const toSave = req.body.pages;

        // check user is included
        if (mongoose.Types.ObjectId.isValid(req.body.jwt.id)) {
            const mongoUserId = mongoose.Types.ObjectId(req.body.jwt.id);

            // check pages are included
            if (toSave.length === 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'No page list included in request',
                });
            } else {
                toSave.forEach((element) => {
                    // for each page to save create a page object
                    const pageToSave = {
                        userId: mongoUserId,
                        pageNo: element.pageNo,
                        svg: element.svg,
                        json: element.json,
                        timestamp: Date.now(),
                    };

                    // save page
                    this.pageService.saveOrUpdate(pageToSave);
                });
                return res.status(HttpStatus.CREATED).json({
                    message: 'Pages saved or updated',
                });
            }
        } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid token',
                });
            }
        }



    // return page object of the furthest saved page
    @Get('resume')
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

        // todo can take this out if decide to save or update entries
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


    // return list of page objects up to and including the furthest saved page
    @Get('resumeList')
    async getMostRecentPageAndPrevious(@Res() res, @Req() req) {

        console.log('furthest page and list route');

        const pagesForUser = await this.pageService.getAllForUser(req.body.jwt.id);

        // order list by page number
        const orderedList = _.sortBy(pagesForUser, (o) => {
            return o.pageNo;
        });

        return res.status(HttpStatus.OK).json({
                         pages: orderedList,
                   });
    //     if (pagesForUser.length === 0) {
    //         return res.status(HttpStatus.OK).json({
    //             page: pagesForUser,
    //             message: 'no saved pages',
    //         });
    //     }
    //
    //     // get the number of the furthest page that user has saved
    // const highestPageNo = await this.pageService.getHighestPageNo(await this.pageService.getAllForUser(req.body.jwt.id));
    //     console.log('highestPageNo ' + highestPageNo);
    //
    //     // for each page from 2 to furthest page read add to list
    // for (let i = 1; i <= highestPageNo; i++) {
    //
    //
    //
    //         // get all saved pages for that pageNo
    //         const savedPages = await this.pageService.getPagesForUserForPageNo(i, req.body.jwt.id);
    //
    //         // if there's only 1 page return that
    //         if (savedPages.length === 1) {
    //             pageList.push(savedPages[0]);
    //         } else {
    //             // find most recent page saved for the pageno
    //             const mostRecent = await this.pageService.getMostRecentPage(savedPages);
    //            pageList.push(mostRecent);
    //         }
    //     }
    //     return res.status(HttpStatus.OK).json({
    //         pageList,
    //     });
    }

    @Get('/pageID/:pageID')
    async getPageByPageID(@Res() res, @Req() req, @Param('pageID') pageID) {
        const page = await this.pageService.getPageByPageID(pageID);
        if (!page) {
            throw new NotFoundException('feedback does not exist');
        }
        return res.status(HttpStatus.OK).json(page);
    }


    // only use with save or update method
    @Get('pageNumber/:pageNo')
    async getPage(@Res() res, @Req() req, @Param('pageNo') pageNo) {
        console.log('get page reached');
        const page = await this.pageService.getPagesForUserForPageNo(pageNo, req.body.jwt.id);
        return res.status(HttpStatus.OK).json({
            page,
        });

        // // if there's no saved pages then respond
        // if (pages.length === 0) {
        //     return res.status(HttpStatus.OK).json({
        //         pages,
        //         message: 'user has not saved this page yet',
        //     });
        // }
        //
        // // if there's only 1 saved page then return it
        // if (pages.length === 1) {
        //     return res.status(HttpStatus.OK).json({
        //         page = pages[0],
        //     });
        //
        // } else {
        //
        //     // find most recently saved page - shouldn't be needed (failsafe)
        //     const page = await this.pageService.getMostRecentPage(pages);
        //     return res.status(HttpStatus.OK).json({
        //         page,
        //     });
        // }

    }

}

