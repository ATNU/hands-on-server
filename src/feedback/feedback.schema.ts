import * as mongoose from 'mongoose';


export const FeedbackSchema = new mongoose.Schema({
    q1Check: String,
    q1Text: String,
    q2Check: String,
    q2Text: String,
    q3Check: String,
    q3Text: String,
    job: String,
    jobText: String,
    device: String,
    deviceText: String,
    canvasSVG: String,
    canvasJSON: String,
    createdAt: String,

});
