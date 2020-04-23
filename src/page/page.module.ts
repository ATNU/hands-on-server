import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import {UserModule} from '../user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import {PageSchema} from './page.schema';


@Module({
  imports: [
      UserModule,
  MongooseModule.forFeature([{name: 'Page', schema: PageSchema}])],
  providers: [PageService],
  controllers: [PageController],
    exports: [PageService],
})
export class PageModule {}
