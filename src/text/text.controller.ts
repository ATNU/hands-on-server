import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {TextService} from '../text/text.service';
import * as fs from "fs";
import * as path from 'path';
import {CreateTextDto} from "./createText.dto";

@Controller('api/text')
export class TextController {
    constructor(private textService: TextService) {

    }

    // @Get()
    // async getText(@Res() res) {
    //
    //     // todo not sure if this path will work in deployment so change to get from db?
    //
    //     fs.readFile('../hands-on-server/src/text/prologue+knights.txt', 'utf8', (err, data) => {
    //         console.log(err);
    //         return res.status(HttpStatus.OK).json(data);
    //     });
    //         }

    @Post('save')
    async saveText(@Res() res, @Req() req, @Body() createTextDto: CreateTextDto) {
        const text = await this.textService.save(createTextDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Text saved',
        });
    }

    // @Get()
    // async getAllText(@Res() res) {
    //     const feeds = await this.textService.getText();
    //     return res.status(HttpStatus.OK).json(feeds.contents);
    // }

@Get() async getText(@Res() res) {
        const data = "And bathed every veyne in swich licour,\n" +
            "  Of which vertu engendred is the flour;\n" +
            "  Whan Zephirus eek with his swete breeth                        5\n" +
            "  Inspired hath in every holt and heeth\n" +
            "  The tendre croppes, and the yonge sonne\n" +
            "  Hath in the Ram his halfe cours y-ronne,\n" +
            "  And smale fowles maken melodye,\n" +
            "  That slepen al the night with open yë,                        10\n" +
            "  (So priketh hem nature in hir corages):\n" +
            "  Than longen folk to goon on pilgrimages\n" +
            "  (And palmers for to seken straunge strondes)\n" +
            "  To ferne halwes, couthe in sondry londes;\n" +
            "  And specially, from every shires ende                         15\n" +
            "  Of Engelond, to Caunterbury they wende,\n" +
            "  The holy blisful martir for to seke,\n" +
            "  That hem hath holpen, whan that they were seke.\n" +
            "    Bifel that, in that seson on a day,\n" +
            "  In Southwerk at the Tabard as I lay                           20\n" +
            "  Redy to wenden on my pilgrimage\n" +
            "  To Caunterbury with ful devout corage,\n" +
            "  At night was come in-to that hostelrye\n" +
            "  Wel nyne and twenty in a companye,\n" +
            "  Of sondry folk, by aventure y-falle                           25\n" +
            "  In felawshipe, and pilgrims were they alle,\n" +
            "  That toward Caunterbury wolden ryde;\n" +
            "  The chambres and the stables weren wyde,\n" +
            "  And wel we weren esed atte beste.\n" +
            "  And shortly, whan the sonne was to reste,                     30\n" +
            "  So hadde I spoken with hem everichon,\n" +
            "  That I was of hir felawshipe anon,\n" +
            "  And made forward erly for to ryse,\n" +
            "  To take our wey, ther as I yow devyse.\n" +
            "   But natheles, whyl I have tyme and space,                   35\n" +
            "  Er that I ferther in this tale pace,\n" +
            "  Me thinketh it acordaunt to resoun,\n" +
            "  To telle yow al the condicioun\n" +
            "  Of ech of hem, so as it semed me,\n" +
            "  And whiche they weren, and of what degree;                    40"
        return res.status(HttpStatus.OK).json(data);
    }

}
