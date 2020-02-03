import * as mongoose from 'mongoose';

export interface CreatePageDto {
    username: string;
    readonly pageNo: number;
    readonly svg: string;
    readonly json: string;
    timestamp: mongoose.Schema.Types.Date;
}
