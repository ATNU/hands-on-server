import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TextModule } from './text/text.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import { PageModule } from './page/page.module';
import * as dotenv from 'dotenv';
import {AuthMiddleware} from './middleware/auth.middleware';
dotenv.config();

/*
* DB_HOST     = mongodb
* DB_PORT     = 27001
* DB_NAME     = hands-on-db
* DB_USER     = 
* DB_PASSWORD =
*/
// 'mongodb://localhost:27017/hands-on-db'


@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false  }),
        FeedbackModule,
        TextModule,
        UserModule,
        AuthModule,
        PageModule],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})


export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('api/page', 'api/feedback/save', 'api/text');
    }
}
