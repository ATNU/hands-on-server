import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {UserService} from './user/user.service';
import {FeedbackService} from './feedback/feedback.service';
import {PageService} from './page/page.service';

@Controller('api/app')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService,
        private readonly feedbackService: FeedbackService,
        private readonly pageService: PageService) {
    }

    @Get('users')
    async getUserSummaries(@Res() res) {

        const usersids = await this.userService.getIDList();

        const summaries = [];
        for (let userid of usersids) {
            const user = await this.userService.findByID(userid);
            const email = user[0].email;
            let furthestPage = 0;
            this.pageService.furthestPageForUser(userid).then((page) => {
                // fallback for those who haven't saved any pages

                if (page === undefined) {
                    furthestPage = 1;
                } else {
                    furthestPage = page.pageNo;
                }
            });

            const pages = await this.pageService.numberForUser(userid);
            const feedbacks = await this.feedbackService.numberForUser(userid);
            const summary = {
                id: userid,
                furthestPage,
                pages,
                feedbacks,
            };
            summaries.push(summary);
        }

        return res.status(HttpStatus.OK).json({
            summaries,
        });
    }

}
