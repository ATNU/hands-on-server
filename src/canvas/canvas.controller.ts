import {Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res} from '@nestjs/common';
import {CanvasService} from './canvas.service';
import {CreateCanvasDto} from './createCanvas.dto';

@Controller('canvas')
export class CanvasController {
    constructor(private canvasService: CanvasService) {
    }

    @Post('save')
    async save(@Res() res, @Body() createCanvasDto: CreateCanvasDto) {
        const canvas = await this.canvasService.save(createCanvasDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Canvas saved',
            canvas,
        });
    }

    @Get('all')
    async getAllCanvas(@Res() res) {
        const canvas = await this.canvasService.getAllCanvas();
        return res.status(HttpStatus.OK).json(canvas);
    }

    @Get(':canvasID')
    async getCanvas(@Res() res, @Param('canvasID') canvasID) {
        const canvas = await this.canvasService.getCanvas(canvasID);
        if (!canvas) {
            throw new NotFoundException('canvas does not exist');
        }
        return res.status(HttpStatus.OK).json(canvas);
    }

}
