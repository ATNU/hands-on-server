import * as mongoose from 'mongoose';

export const PageSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    pageNo: Number,
    svg: String,
    json: String,
    timestamp: mongoose.Schema.Types.Date,
});
