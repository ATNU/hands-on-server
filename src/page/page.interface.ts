import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Page extends Document {
    username: string;
    readonly pageNo: number;
    readonly svg: string;
    readonly json: string;
    timestamp: mongoose.Schema.Types.Date;
}
