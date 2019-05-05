import { createAction } from 'typesafe-actions'
import * as Types from './types'

export const Login = createAction(Types.ActionTypes.LOGIN, action => {
    return (username: string, password: string) => action({username, password})
});

export const LoggedIn = createAction(Types.ActionTypes.LOGGED_IN, action => {
    return (sessionId: string, expiry: Date) => action({sessionId, expiry})
});

export const LoginError = createAction(Types.ActionTypes.LOGIN_ERROR, action => {
    return (error: string) => action({error})
});

export const Logout = createAction(Types.ActionTypes.LOGOUT);