import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Feedback extends Document {
    readonly text: string;
    readonly canvasId: mongoose.Schema.Types.ObjectId;
}
