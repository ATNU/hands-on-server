import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {CanvasSchema} from './canvas.schema';


@Module({
  imports: [ MongooseModule.forFeature([{name: 'Canvas', schema: CanvasSchema}])],
  providers: [CanvasService],
  controllers: [CanvasController],
})
export class CanvasModule {}
