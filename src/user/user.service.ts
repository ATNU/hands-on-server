import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUserDto} from './createUser.dto';
import {User} from './user.interface';
import {Model} from 'mongoose';

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

    // returns empty list if none found
    async findByUsername(usernameSupplied: string): Promise<User> {
        return this.userModel.find({username: usernameSupplied});
    }


}
