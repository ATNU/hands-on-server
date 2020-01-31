import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TextModule } from './text/text.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {AuthService} from './auth/auth.service';

/*
* DB_HOST     = mongodb
* DB_PORT     = 27001
* DB_NAME     = hands-on-db
* DB_USER     = 
* DB_PASSWORD =
*/

// for production
@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }),
        FeedbackModule],
    controllers: [AppController],
    providers: [AppService],
})

// for local development
// @Module({
//     imports: [
//         MongooseModule.forRoot('mongodb://localhost:27017/hands-on-db', { useNewUrlParser: true, useUnifiedTopology: true }),
//         FeedbackModule,
//         TextModule,
//         UserModule,
//         AuthModule],
//     controllers: [AppController, AuthController],
//     providers: [AppService, AuthService],
// })


export class AppModule {}
