import { createAction } from 'typesafe-actions'
import * as Types from './types'

export const Login = createAction(Types.ActionTypes.LOGIN, action => {
    return (username: string, password: string) => action({username, password})
});

export const LoggedIn = createAction(Types.ActionTypes.LOGGED_IN, action => {
    return (sessionId: string, expiry: Date, username?: string) => action({sessionId, expiry, username})
});

export const LoginError = createAction(Types.ActionTypes.LOGIN_ERROR, action => {
    return (error: string) => action({error})
});

export const KeepAlive = createAction(Types.ActionTypes.KEEP_ALIVE, action => {
    return (expiry: Date) => action({expiry})
});

export const StillAlive = createAction(Types.ActionTypes.STILL_ALIVE, action => {
    return (expiry: Date) => action({expiry})
});

export const Logout = createAction(Types.ActionTypes.LOGOUT);

export const LoggedOut = createAction(Types.ActionTypes.LOGGED_OUT);