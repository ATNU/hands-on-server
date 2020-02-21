import * as mongoose from 'mongoose';

export interface CreateTextDto  {
   readonly part: number;
   readonly contents: string;
}
