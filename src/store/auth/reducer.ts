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
    .handleAction(Actions.Login, (state, action) => {
        console.log("Got action:");
        console.log(action);
        return {
            ...state,
            busy: true,
        }
    });

/*export const reducer: Reducer<Types.State> = (state = initialState, action): Types.State => {
    switch(action.type) {
        case Types.ActionTypes.LOGIN:
            return { ...state, busy: true };
        case Types.ActionTypes.LOGGED_IN:
            return {...state, busy: false };
        default: return state;
    }
}*/

