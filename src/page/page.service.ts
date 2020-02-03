import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Page} from './page.interface';
import {Model} from 'mongoose';
import {CreateFeedbackDto} from '../feedback/createFeedback.dto';
import {Feedback} from '../feedback/feedback.interface';
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


}
