import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './createUser.dto';

@Controller('ap/user')
export class UserController {
    constructor(private userService: UserService) {

    }

    @Post('signup')
    async saveUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.save(createUserDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'User saved',
            user,
        });
    }

    // todo log in

}
