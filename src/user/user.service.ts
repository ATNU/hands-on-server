import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from './user.interface';
import {CreateUserDto} from './createUser.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
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

    // returns 0 to indicate error
    async getFurthestPage(email: string) {
        await this.findByEmail(email).then((user) => {
            if (user) {
                return user.furthestPage;
            }
            return 0;
        });
    }
}
