import { Document } from 'mongoose';

export interface Canvas extends Document {
    readonly imageString: string;
}
