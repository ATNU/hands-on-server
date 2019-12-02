import { Document } from 'mongoose';


export interface Feedback extends Document {
    readonly q1Check: string;
    readonly q1Text: string;
    readonly q2Check: string;
    readonly q2Text: string;
    readonly q3Check: string;
    readonly q3Text: string;
    readonly job: string;
    readonly jobText: string;
    readonly device: string;
    readonly deviceText: string;
    readonly canvasSVG: string;
    readonly canvasJSON: string;
    readonly createdAt: string;
}
