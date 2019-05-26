import { createAction } from "typesafe-actions"
import * as Types from './types'

import { DomainModel } from '../../api/Domains'

export const Fetch = createAction(Types.ActionTypes.FETCH, action => {
    return (offset: number, limit: number) => action({offset, limit})
});

export const Fetched = createAction(Types.ActionTypes.FETCHED, action => {
    return (data: Array<DomainModel>, totalLength: number) => action({data, totalLength})
});

export const FetchError = createAction(Types.ActionTypes.FETCHERROR, action => {
    return (error: string) => action({error})
});