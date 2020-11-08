import {DomainModel} from '../../api/Domains'

export enum ActionTypes {
    FETCH = 'domains/Fetch',
    FETCHED = 'domain/Fetched',
    FETCH_ERROR = 'domain/FetchError',
    SAVE = 'domains/Save',
    SAVED = 'domains/Saved',
    SAVE_ERROR = 'domains/SaveError',
}

export interface State {
    readonly busy: boolean,
    readonly data: Array<DomainModel>,
    readonly totalLength: number,
    readonly limit: number,
    readonly offset: number,
}

