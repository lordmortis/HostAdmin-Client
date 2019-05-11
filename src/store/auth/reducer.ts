import {createReducer} from "typesafe-actions";

import * as Actions from './actions'
import * as Types from './types'

const initialState: Types.State = {
    busy: false,
    sessionID: undefined,
    username: undefined,
    errors: [],
}

export const reducer = createReducer(initialState)
    .handleAction(Actions.Login, (state, action: ReturnType<typeof Actions.Login>) => {
        return {
            ...state,
            busy: true,
            username: action.payload.username,
        }
    }).handleAction(Actions.LoggedIn, (state, action: ReturnType<typeof Actions.LoggedIn>) => {
        return {
            ...state,
            busy: false,
            sessionID: action.payload.sessionId,
            expiry: action.payload.expiry,
        }
    }).handleAction(Actions.LoginError, (state, action: ReturnType<typeof Actions.LoginError>) => {
        return {
            ...state,
            busy: false,
            username: undefined,
            sessionID: undefined,
            expiry: undefined,
            errors: [action.payload.error]
        }
    }).handleAction(Actions.StillAlive, (state, action: ReturnType<typeof Actions.StillAlive>) => {
        return {
            ...state,
            expiry: action.payload.expiry,
        }
    }).handleAction(Actions.LoggedOut, (state, action: ReturnType<typeof Actions.LoggedOut>) => {
        return {
            ...state,
            busy: false,
            username: undefined,
            sessionID: undefined,
            expiry: undefined,
        }
    })

/*export const reducer: Reducer<Types.State> = (state = initialState, action): Types.State => {
    switch(action.type) {
        case Types.ActionTypes.LOGIN:
            return { ...state, busy: true };
        case Types.ActionTypes.LOGGED_IN:
            return {...state, busy: false };
        default: return state;
    }
}*/

