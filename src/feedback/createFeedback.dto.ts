

export interface CreateFeedbackDto  {
    readonly q1Check: boolean;
    readonly q1Text: string;
    readonly q2Check: boolean;
    readonly q2Text: string;
    readonly q3Check: boolean;
    readonly q3Text: string;
    readonly job: string;
    readonly jobText: string;
    readonly device: string;
    readonly deviceText: string;
    readonly canvasSVG: string;
    readonly canvasJSON: string;
    readonly createdAt: string;
}
