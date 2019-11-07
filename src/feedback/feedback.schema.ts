import * as mongoose from 'mongoose';


export const FeedbackSchema = new mongoose.Schema({
    text: String,
    canvasId: mongoose.Schema.Types.ObjectId,
});
