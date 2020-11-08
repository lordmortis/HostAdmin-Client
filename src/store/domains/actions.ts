import { createAction } from "typesafe-actions"
import * as Types from './types'

import { DomainModel } from '../../api/Domains'

export const Fetch = createAction(Types.ActionTypes.FETCH, action => {
    return (offset: number, limit: number) => action({offset, limit})
});

export const Fetched = createAction(Types.ActionTypes.FETCHED, action => {
    return (data: Array<DomainModel>, totalLength: number) => action({data, totalLength})
});

export const FetchError = createAction(Types.ActionTypes.FETCH_ERROR, action => {
    return (error: string) => action({error})
});

export const Save = createAction(Types.ActionTypes.SAVE, action => {
    return (data: DomainModel, offset: number, limit: number) => action({data, offset, limit})
});

export const Saved = createAction(Types.ActionTypes.SAVED, action => {
    return () => action({})
});

export const SaveError = createAction(Types.ActionTypes.SAVE_ERROR, action => {
    return (error: string) => action({error})
});