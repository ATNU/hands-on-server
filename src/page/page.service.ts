import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Page} from './page.interface';
import {Model} from 'mongoose';
import * as mongoose from 'mongoose';
import {CreatePageDto} from './createPage.dto';

@Injectable()
export class PageService {
    constructor(@InjectModel('Page') private readonly pageModel: Model<Page>) {
    }

    async save(createPageDto: CreatePageDto): Promise<Page> {
        console.log(createPageDto);
        const savedPage = new this.pageModel(createPageDto);
        return await savedPage.save();
    }

    // todo get most recently saved version of page number x

    async getAllForUser(userId) {
        return await this.pageModel.find({userId});
    }

    async getPagesForUserForPageNo(pageNo, userId) {
        return await this.pageModel.find({userId, pageNo});
    }

    async getMostRecentPage(pages) {
        let highestTime = new Date('2020-02-05T14:03:40+00:00');
        let mostRecentPage;
        for (const pg of pages) {
            const dateOfPg = new Date(pg.timestamp);

            if (dateOfPg > highestTime) {
                // new highestTime
                highestTime = dateOfPg;
                mostRecentPage = pg;
            }
        }
        return mostRecentPage;
    }

//     async getFurthestPage(userId): Promise<Page> {
//         console.log('furthest page in service');
//         const allPages = await this.pageModel.find({userId});
//
// // if there's no pages then user has none saved
//         if (allPages.length === 0) {
//             console.log('no pages for this user');
//             return null;
//         } else {
//             // if there's more than one page saved then look for most recent
//             if (allPages.length > 1) {
//
//                 // for each page saved for that user find the highest pageNo
//
//                 const highestNumber = await this.getHighestPageNo(allPages);
//
//                 console.log('highestNumber ' + highestNumber);
//
//                 // get all pages with that pageNo
//                 this.pageModel.find({userId, pageNo: highestNumber}).then((pagesForHighest) => {
//                     console.log('pagesForHighest' + pagesForHighest);
//
//                     // if there's only one then return this
//                     if (pagesForHighest.length === 1) {
//                         console.log('only 1 page for the highest page number');
//                         const pageId1 = pagesForHighest[0]._id;
//                         this.pageModel.find({_id: pageId1}).then((result) => {
//                                 console.log('returning result1 ' + result);
//                                 return result;
//                             },
//                         );
//                     } else {
//                         // look for the most recent timestamp
//                         let highestTime = new Date('2020-02-05T14:03:40+00:00');
//                         let mostRecentPage;
//                         for (const pg of pagesForHighest) {
//                             const dateOfPg = new Date(pg.timestamp);
//
//                             if (dateOfPg > highestTime) {
//                                 // new highestTime
//                                 highestTime = dateOfPg;
//                                 mostRecentPage = pg;
//                             }
//                         }
//                         const pageId2 = mostRecentPage._id;
//
//                         this.pageModel.find({_id: pageId2}).then((result) => {
//                             console.log('returning 2');
//                             return result;
//                         });
//                     }
//                 });
//             }
//
//             // if there's only 1 page saved then return this
//             if (allPages.length === 1) {
//                 console.log('only 1 page saved for this user');
//
//                 const pageId = allPages[0]._id;
//
//                 return await this.pageModel.find({_id: pageId});
//             }
//         }
//     }

    // get highest page number from a list of pages
    async getHighestPageNo(allPages) {
        let highestNumber = 0;
        for (const page of allPages) {
            if (page.pageNo >= highestNumber) {
                highestNumber = page.pageNo;
            }
        }
        return highestNumber;
    }
}
