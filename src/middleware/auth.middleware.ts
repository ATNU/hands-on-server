import {HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    // tslint:disable-next-line:ban-types
    use(req: Request, res: Response, next: Function) {
        const errorMessage = (errorString: string) => res.status(HttpStatus.BAD_REQUEST).json({
            message: errorMessage,
        });

        const header = req.headers;
        console.log('auth middleware reached');

        if (header.authorization === undefined) {
            console.log('No bearer authorization in header');
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No bearer authorization in header',
            });
        }

        let token = header.authorization;

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
           if (err) {
               console.log(err);
               return res.status(HttpStatus.BAD_REQUEST).json({
                   message: err.message,
               });
           }
           if (decoded === null) {
                console.log('token is invalid');
               return res.status(HttpStatus.BAD_REQUEST).json({
                   message: 'Token is invalid, please sign in again',
               });

            } else {
               console.log('token is valid, progress to controller');
               req.body.jwt = decoded;
               next();
           }

        });


    }
}
