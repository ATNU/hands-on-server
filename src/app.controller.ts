import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {UserService} from "./user/user.service";
import {FeedbackService} from "./feedback/feedback.service";
import {PageService} from "./page/page.service";

@Controller('api/app')
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly userService: UserService,
      private readonly feedbackService: FeedbackService,
      private readonly pageService: PageService) {
  }

  @Get('user')
  async getUserSummary(@Query() query, @Res() res) {
    const idString = query.ID;
    this.userService.findByID(idString).then((user) => {
        const email = user.email;
        this.feedbackService.numberForUser(idString).then((fNo) => {
          const feedbacks = fNo;
          this.pageService.numberForUser(idString).then((pNo) => {
              const pages = pNo;
              this.pageService.furthestPageForUser(idString).then((page) => {
                  // fallback for those who haven't saved any pages
                  let furthestPage = 1;
                  console.log(page);

                  if (furthestPage !== undefined) {
                      console.log(page);
                      furthestPage = page.pageNo;
                  }

                  const summary = {
                        id: idString,
                        email,
                        furthestPage,
                        pages,
                        feedbacks,
                    };

                  return res.status(HttpStatus.OK).json({
                        summary,
                    });
                });
            });
        });
    });
  }
}
