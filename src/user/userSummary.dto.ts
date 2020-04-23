import * as mongoose from 'mongoose';

export interface userSummary  {
    id: mongoose.Schema.Types.ObjectId;
    email: string;
    furthestPage: number;
    feedbacks: number;
    pagesSaved: number;
}
