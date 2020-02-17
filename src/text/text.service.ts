import { Injectable } from '@nestjs/common';
import {CreateTextDto} from "./createText.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {Text} from './text.interface';

@Injectable()
export class TextService {

    constructor(@InjectModel('Text') private readonly textModel: Model<Text>) {
    }

    async getText(): Promise<Text> {
        return await this.textModel.findOne().exec();
    }

    async save(createTextDto: CreateTextDto) {
        const savedText = new this.textModel(createTextDto);
        return await savedText.save();
    }
}
