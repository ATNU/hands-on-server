import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TextSchema} from "./text.schema";

@Module({
    imports: [ MongooseModule.forFeature([{name: 'Text', schema: TextSchema}])],
  controllers: [TextController],

  providers: [TextService],
})
export class TextModule {}
