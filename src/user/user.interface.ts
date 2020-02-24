import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document  {
    _id: mongoose.Schema.Types.ObjectId;
    readonly email: string;
     password: string;
}
