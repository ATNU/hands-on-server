import * as mongoose from 'mongoose';

export interface CreatePageDto {
    userId: mongoose.Schema.Types.ObjectId;
    readonly pageNo: number;
    readonly svg: string;
    readonly json: string;
    timestamp: mongoose.Schema.Types.Date;
}
