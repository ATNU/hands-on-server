import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './createUser.dto';
import {create} from 'domain';
import {type} from 'os';
import {retrieveCols} from '@nestjs/cli/actions';

@Controller('api/user')
export class UserController {
    constructor(private userService: UserService) {

    }

    @Post('signup')
    async saveUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        // todo reject if fields aren't there

        const retreivedUser = await this.userService.findByUsername(createUserDto.username);
        console.log(Object.keys(retreivedUser).length);

        // check if returned object is empty
        if (Object.keys(retreivedUser).length > 0) {
            console.log('username taken');
            // username is in use
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'username taken',
            });
        }

        else {
            const user = await this.userService.save(createUserDto);
            return res.status(HttpStatus.CREATED).json({
                message: 'User saved',
                user,
            });
        }
        // todo check password validity, check username not taken, encrypt password

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
