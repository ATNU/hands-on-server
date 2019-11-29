import * as mongoose from 'mongoose';


export const FeedbackSchema = new mongoose.Schema({
    q1Check: Boolean,
    q1Text: String,
    q2Check: Boolean,
    q2Text: String,
    q3Check: Boolean,
    q3Text: String,
    job: String,
    jobText: String,
    device: String,
    deviceText: String,
    canvasSVG: String,
    canvasJSON: String,
    createdAt: String,

});
