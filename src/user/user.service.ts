import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from './user.interface';
import {CreateUserDto} from './createUser.dto';
import {FeedbackService} from '../feedback/feedback.service';
import {PageService} from '../page/page.service';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {
    }

    async getIDList() {
        const users = await this.findAll();
        const ids = [];
        users.forEach((user) => {
            ids.push(user._id);
        });
        return ids;
    }

    async save(createUserDto: CreateUserDto): Promise<User> {
        console.log(createUserDto);
        const savedUser = new this.userModel(createUserDto);
        return await savedUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByEmail(emailSupplied: string): Promise<User> {
        return this.userModel.find({email: emailSupplied});
    }


   async updatePassword(email, password) {
        const query = { email };
        await this.userModel.updateOne(query, {password}, (err, doc) => {
            console.log(doc);
            return doc;
        });
   }

   async findByID(userID: Promise<User[]>) {
       return this.userModel.find({_id: userID}).exec();
   }
}
