import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './createUser.dto';
import * as bcrypt from 'bcrypt';

@Controller('api/user')
export class UserController {
    constructor(private userService: UserService) {

    }

}
