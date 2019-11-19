import * as mongoose from 'mongoose';


export const FeedbackSchema = new mongoose.Schema({
    feedbackText: String,
    canvasSVG: String,
    canvasJSON: String,

});
