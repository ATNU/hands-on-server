import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Canvas extends Document {
    readonly imageString: string;
}
