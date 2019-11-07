import * as mongoose from 'mongoose';

export interface CreateFeedbackDto  {
    readonly text: string;
    readonly canvasId: mongoose.Schema.Types.ObjectId;
}
