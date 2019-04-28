import { Reducer } from 'redux'
import * as Types from './types'

const initialState: Types.State = {
    busy: false,
    sessionID: undefined,
    username: undefined,
    errors: [],
}

export const reducer: Reducer<Types.State> = (state = initialState, action): Types.State => {
    switch(action.type) {
        case Types.ActionTypes.LOGIN:
            return { ...state, busy: true };
        case Types.ActionTypes.LOGGED_IN:
            return {...state, busy: false };
        default: return state;
    }
}

