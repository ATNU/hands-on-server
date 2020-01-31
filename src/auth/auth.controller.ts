import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {CreateUserDto} from '../user/createUser.dto';
import * as bcrypt from 'bcrypt';
import {AuthService} from './auth.service';
import { Model } from 'mongoose';
import {User} from '../user/user.interface';
import {typeIsOrHasBaseType} from 'tslint/lib/language/typeUtils';

@Controller('api/auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService) {

    }

    @Post('signup')
    async saveUser(@Res() res, @Body() createUserDto: CreateUserDto) {

        const user = createUserDto;

        // ----- reject if required fields are missing
        if (!user.username || !user.email || !user.password) {
            console.log('missing details');
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Please provide username, email and password to sign up',
            });
        }

;
        // ------ check username not in use
        const retreivedUser = await this.userService.findByUsername(createUserDto.username);

        // check if returned object is empty
        if (Object.keys(retreivedUser).length > 0) {
            console.log('username taken');
            // username is in use
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Username taken',
            });
        } else {

            // ------ check email not in use
            const retrievedPass = await this.userService.findByEmail(createUserDto.email);
            if (Object.keys(retrievedPass).length > 0) {
                // email is taken
                console.log('email used');
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Email taken',
                });
            } else {
                // email isn't taken

                // todo check email validity
                // todo check password validity
                // ----- hash password

                bcrypt.hash(user.password, 10, async (err, hash) => {
                    if (err) {
                        console.log('hashing error');
                        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            message: 'Problem hashing password',
                        })
                    } else {
                        user.password = hash;

                        user.furthestPage = 1;

                        // save user in db
                        const savedUser = await this.userService.save(user);
                        savedUser.password = undefined;

                        return res.status(HttpStatus.CREATED).json({
                            message: 'User saved',
                            savedUser,
                        });
                    }
                });
            }

        }
    }



    @Get('login')
    async logIn(@Res() res, @Body() createUserDto: CreateUserDto) {
        const username = createUserDto.username;
        const unhashedPass = createUserDto.password;

        // list of objects with that username
        const rUser = await this.userService.findByUsername(username);

        if (Object.keys(rUser).length === 0) {
            // no user found
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Username does not exist',
            });
        } else {
            // check password matches
            const user = rUser[0];

                bcrypt.compare(unhashedPass, user.password, (error, match) => {
                    if (error) {
                        console.log('passwords dont match');
                        res.status(HttpStatus.UNAUTHORIZED).json({
                            message: 'Password is not correct',
                        });
                    } else {
                        console.log('passwords match');

                        // hide password
                        rUser.password = undefined;

                        // create and send jwt
                        const tokenData = this.authService.createToken(rUser);
                        res.status(HttpStatus.OK).json({
                            tokenData,
                        });
                    }
                });
        }

    }


    @Get('allUsers')
    async getAll() {
        return await this.userService.findAll();
    }

// @Get('byUsername')
//     async getByUsername() {
//         return this.userService.usernameTaken('testUsername');
// }

    // todo log in

}
