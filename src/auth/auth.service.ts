import { Injectable } from '@nestjs/common';
import {User} from '../user/user.interface';
import TokenData from './tokenData.interface';
import DataStoredInToken from './dataStoredInToken.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor() {

    }

    createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            username: user.username,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }

}
