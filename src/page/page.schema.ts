import * as mongoose from 'mongoose';

export const PageSchema = new mongoose.Schema({
    username: String,
    pageNo: Number,
    svg: String,
    json: String,
    timestamp: mongoose.Schema.Types.Date,
});
