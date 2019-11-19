import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Feedback extends Document {
    readonly feedbackText: string;
    readonly canvasSVG: string;
    readonly canvasJSON: string;
}
