export enum ActionType {
    Greet = 'greet',
}

export interface IAction {
    type: ActionType;
    value?: any;
}
