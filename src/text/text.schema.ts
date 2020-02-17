import * as mongoose from 'mongoose';


export const TextSchema = new mongoose.Schema({
   contents: String,
});