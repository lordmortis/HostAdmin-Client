import {DomainModel} from '../../api/Domains'

export enum ActionTypes {
    FETCH = 'domains/Fetch',
    FETCHED = 'domain/Fetched',
    FETCHERROR = 'domain/FetchError',
}

export interface State {
    readonly busy: boolean,
    readonly data: Array<DomainModel>,
    readonly totalLength: number,
}

