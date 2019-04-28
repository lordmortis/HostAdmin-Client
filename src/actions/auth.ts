import { createAction } from 'typesafe-actions';

export const LoggingIn = createAction('auth/LoggingIn');
export const LoggedIn = createAction('auth/LoggedIn');
