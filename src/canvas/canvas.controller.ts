import {Body, Controller, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {CanvasService} from './canvas.service';
import {CreateCanvasDto} from './createCanvas.dto';

@Controller('canvas')
export class CanvasController {
    constructor(private canvasService: CanvasService) {}

    @Post('save')
    async saveCanvas(@Res() res, @Body() createCanvasDto: CreateCanvasDto ) {
        const canvas = await this.canvasService.save(createCanvasDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Canvas saved',
            canvas,
        })
    }
}
