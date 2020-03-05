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
        if ( !user.email || !user.password) {
            console.log('missing details');
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Please provide email and password to sign up',
            });
        }

;
        // ------ check username not in use
        const retreivedUser = await this.userService.findByEmail(createUserDto.email);

        // check if returned object is empty
        if (Object.keys(retreivedUser).length > 0) {
            console.log('email already in use');
            // username is in use
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Email already in use',
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
                        });
                    } else {
                        user.password = hash;

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



    @Post('login')
    async logIn(@Res() res, @Body() createUserDto: CreateUserDto) {
        const email = createUserDto.email;
        const unhashedPass = createUserDto.password;

        // list of objects with that username
        const rUser = await this.userService.findByEmail(email);

        if (Object.keys(rUser).length === 0) {
            // no user found
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Email not in use',
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

                        // create and send jwt
                        const tokenData = this.authService.createToken(rUser);
                        res.status(HttpStatus.OK).json({
                            tokenData,
                        });
                    }
                });
        }

    }

    @Post('reset')
    async resetPassword(@Req() req, @Res() res) {
        const email = req.body.email;
        const password = req.body.password;

        if (email === undefined || password === undefined) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Please provide email and new password',
            });
        } else {
            // check email is registered
            const retreivedUser = await this.userService.findByEmail(email);

            if (Object.keys(retreivedUser).length === 0) {
                // no email registered
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Email not in use',
                });
            } else {
                // hash new password
                bcrypt.hash(password, 10, async (err, hashed) => {
                    if (err) {
                        console.log('hashing error');
                        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            message: 'Problem hashing password',
                        });
                    } else {

                        // update
                        this.userService.updatePassword(email, hashed);

                        return res.status(HttpStatus.CREATED).json({
                            message: 'Password updated',
                        });
                    }
                });
            }
        }
    }


    @Get('allUsers')
    async getAll() {
        return await this.userService.findAll();
    }
}
