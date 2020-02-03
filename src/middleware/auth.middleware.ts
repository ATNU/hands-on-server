import {HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const errorMessage = (errorMessage: string) => res.status(HttpStatus.BAD_REQUEST).json({
            message: errorMessage,
        });

        const header = req.headers;
        console.log(header.authorization);

        if (!header) {
            return errorMessage('No header');
        }
        if (!header.authorization) {
            return errorMessage('No authorization in header');
        }

        let token = header.authorization;

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
           if (err) {
               console.log(err);
               return errorMessage(err.message);
           }
           if (decoded === null) {
                console.log('token is invalid');
                return errorMessage('Token is invalid, please sign in again');
            } else {
               // send on details?
               console.log(decoded);
               next();
           }

        });


    }
}
