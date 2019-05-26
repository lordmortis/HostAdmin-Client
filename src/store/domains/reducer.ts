import {createReducer} from "typesafe-actions";

import * as Actions from './actions'
import * as Types from './types'

const initialState: Types.State = {
    busy: false,
    data: [],
    totalLength: 0,
};

export const reducer = createReducer(initialState)
    .handleAction(Actions.Fetch, (state) => {
        return {
            ...state,
            busy: true,
        }
    }).handleAction(Actions.Fetched, (state, action: ReturnType<typeof Actions.Fetched>) => {
        return {
            ...state,
            busy: false,
            data: action.payload.data,
            totalLength: action.payload.totalLength,
        }
    }).handleAction(Actions.FetchError, (state, action: ReturnType<typeof Actions.FetchError>)=> {
        return {
            ...state,
            busy: false,
            error: action.payload.error,
        }
    }).handleAction(Actions.Save, (state, action: ReturnType<typeof Actions.Save>) => {
        return {
            ...state,
            busy: true,
        }
    }).handleAction(Actions.Saved, (state, action: ReturnType<typeof Actions.Saved>) => {
        return {
            ...state,
            busy: false,
        }
    }).handleAction(Actions.SaveError, (state, action: ReturnType<typeof Actions.SaveError>) => {
        return {
            ...state,
            busy: false,
            error: action.payload.error,
        }
    });