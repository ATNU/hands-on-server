import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './createUser.dto';
import * as bcrypt from 'bcrypt';

@Controller('api/user')
export class UserController {
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

                // ----- hash password
                console.log('unhashed pass' + user.password);
                bcrypt.hash(user.password, 10, (err, hash) => {
                    if (err) {
                        console.log('hashing error');
                        // throw error
                    } else {
                        user.password = hash;
                        console.log('hashed pass' + user.password);
                        // save user in db
                        const savedUser = this.userService.save(user);
                        return res.status(HttpStatus.CREATED).json({
                            message: 'User saved',
                            savedUser,
                        });
                    }
                });
            }
            // todo check password validity
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
