export type Depression = 'H' | 'MD' | 'D';
export interface GetFeatureDto {
    topics: string[];
    emotion: string;
    depression: Depression;
}
export interface GetAnswerDto {
    answer: string;
    summaries: string[];
}
export interface ActionItems {
    title: string;
    content: string;
}
export interface GetActionItemsDto {
    actionItems: ActionItems[];
}
