import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Text extends Document {
    contents: string;
}
