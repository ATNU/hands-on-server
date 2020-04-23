import { Injectable } from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';

import {Model} from 'mongoose';
import {Text} from './text.interface';

@Injectable()
export class TextService {

    constructor(@InjectModel('Text') private readonly textModel: Model<Text>) {
    }


    async getText(): Promise<Text[]> {
       return await this.textModel.find().exec();

    }

}
