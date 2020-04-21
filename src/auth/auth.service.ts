import { Injectable } from '@nestjs/common';
import {User} from '../user/user.interface';
import TokenData from './tokenData.interface';
import DataStoredInToken from './dataStoredInToken.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor() {

    }

    createToken(user): TokenData {
        const expiresIn = 5 * 60 * 60; // 5 hours
        const secret = process.env.JWT_SECRET;
        return {
            expiresIn,
            token: jwt.sign({id: user[0]._id}, secret, { expiresIn }),
        };
    }

}
