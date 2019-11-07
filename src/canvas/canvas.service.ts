import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Canvas} from './canvas.interface';
import { Model } from 'mongoose';
import {CreateCanvasDto} from './createCanvas.dto';

@Injectable()
export class CanvasService {
    constructor(@InjectModel('Canvas') private readonly canvasModel: Model<Canvas>) {

    }

    async save(createCanvasDto: CreateCanvasDto): Promise<Canvas> {
        const savedCanvas = new this.canvasModel(createCanvasDto);
        return await savedCanvas.save();
    }

    async getAllCanvas(): Promise<Canvas[]> {
        return await this.canvasModel.find().exec();
    }

    async getCanvas(canvasID): Promise<Canvas> {
        return await this.canvasModel.findById(canvasID).exec();
    }
}
