import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {TextService} from '../text/text.service';
import * as fs from "fs";
import * as mongoose from 'mongoose';
import * as mongo from 'mongodb';


@Controller('api/text')
export class TextController {
    constructor(private textService: TextService) {

    }

    @Get()
    async getText(@Res() res) {

        const text = await this.textService.getText();
        // console.log(text[0].contents);
        return res.status(HttpStatus.OK).send(text[0]);



        //  const strContents = '"' + text[0].contents + '"';
        //  const textList = text[0].contents.split('+');
        //  let combinedLines = '';
        // textList.forEach((line) => {
        //     line.replace('"', '');
        //     combinedLines = combinedLines + line;
        //   });
        //
        // const withoutSpaces = combinedLines.replace('"\\s+"', '');
        //
        //   return res.status(HttpStatus.OK).send(withoutSpaces);

        // fs.readFile('../hands-on-server/src/text/prologue+knights.txt', 'utf8', (err, data) => {
        //
        //     console.log('error reading file: ' + err);
        //
        //     return res.status(HttpStatus.OK).json(data);
        // });
    }
}
