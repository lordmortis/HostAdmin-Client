import {UserModel} from "../../api/Users";

export enum ActionTypes {
    FETCH = 'users/Fetch',
    FETCHED = 'users/Fetched',
    FETCH_ERROR = 'users/FetchError',
    SAVE = 'users/Save',
    SAVED = 'users/Saved',
    SAVE_ERROR = 'users/SaveError',
}

export interface State {
    readonly busy: boolean,
    readonly data: Array<UserModel>,
    readonly totalLength: number,
    readonly limit: number,
    readonly offset: number,
}

