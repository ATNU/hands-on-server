import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {CreateUserDto} from '../user/createUser.dto';
import * as bcrypt from 'bcrypt';

@Controller('api/auth')
export class AuthController {
    constructor(private userService: UserService) {

    }

    @Post('signup')
    async saveUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        // todo reject if fields aren't there

        let user = createUserDto;

        // ------ check username not in use
        const retreivedUser = await this.userService.findByUsername(createUserDto.username);

        // check if returned object is empty
        if (Object.keys(retreivedUser).length > 0) {
            console.log('username taken');
            // username is in use
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'username taken',
            });
        } else {

            // ------ check email not in use
            const retrievedPass = await this.userService.findByEmail(createUserDto.email);
            if (Object.keys(retrievedPass).length > 0) {
                // email is taken
                console.log('email used');
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'email taken',
                });
            } else {
                // email isn't taken
                // todo check password validity
                // ----- hash password

                bcrypt.hash(user.password, 10, async (err, hash) => {
                    if (err) {
                        console.log('hashing error');
                        // throw error
                    } else {
                        user.password = hash;

                        // save user in db
                        const savedUser = await this.userService.save(user);
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
    async logIn(@Req() req, @Res() res) {
        const username = req.body.username;
        const unhashedPass = req.body.password;

        const rUser = this.userService.findByUsername(username);
        console.log('rUser' + Object.keys(rUser).length);
        if (Object.keys(rUser).length === 0) {
            // no user found
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'username does not exist',
            });
        } else {
            // check password matches
            this.userService.findByUsername(username).then((user) => {
                bcrypt.compare(unhashedPass, user.password, (error, match) => {
                    if (error) {
                        console.log('passwords dont match');
                    } else {
                        console.log('passwords match');
                    }
                });
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
