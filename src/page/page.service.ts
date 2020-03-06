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
        return await this.pageModel.findOne({userId, pageNo});
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

    async furthestPageForUser(userId) {
        const pages = await this.getAllForUser(userId);
            return this.getMostRecentPage(pages);
    }

    async saveOrUpdate(newPage) {
        const userId = newPage.userId;
        const pageNo = newPage.pageNo;

        // search using email and page number and either create new document or update existing.
        const query = { userId, pageNo };
        this.pageModel.findOneAndUpdate(query, newPage, {upsert: true}, (err, doc) => {
            if (doc) { return doc; }
        });

    }

    async numberForUser(userId) {
        const list = await this.getAllForUser(userId);
           return Object.keys(list).length;
    }

    async getPageByPageID(pageID): Promise<Page> {
        return await this.pageModel.findById(pageID).exec();
    }
}
