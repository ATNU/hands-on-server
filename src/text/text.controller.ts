import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {TextService} from '../text/text.service';
import * as fs from "fs";
import * as path from 'path';

@Controller('api/text')
export class TextController {
    constructor(private textService: TextService) {

    }

    @Get()
    async getText(@Res() res) {

        // todo not sure if this path will work in deployment so change to get from db?

        fs.readFile('../hands-on-server/src/text/prologue.txt', 'utf8', (err, data) => {
            console.log(err);
            return res.status(HttpStatus.OK).json(data);
        });
            }
}
