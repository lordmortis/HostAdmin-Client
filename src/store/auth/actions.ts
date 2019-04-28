import { action } from 'typesafe-actions'
import * as Types from './types'

export const Login = () => action(Types.ActionTypes.LOGIN);

export const LoggingIn = () => action(Types.ActionTypes.LOGGING_IN);
export const LoggedIn = () => action(Types.ActionTypes.LOGGED_IN);