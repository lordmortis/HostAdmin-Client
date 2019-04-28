import { createAction } from 'typesafe-actions'
import * as Types from './types'

export const Login = createAction(Types.ActionTypes.LOGIN, action => {
    return (username: string, password: string) => action({username, password})
});

export const LoggingIn = createAction(Types.ActionTypes.LOGGING_IN);
export const LoggedIn = createAction(Types.ActionTypes.LOGGED_IN);