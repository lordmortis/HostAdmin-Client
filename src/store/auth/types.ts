export enum ActionTypes {
    LOGIN = 'auth/LogIn',
    LOGIN_ERROR = 'auth/Error',
    LOGGED_IN = 'auth/Complete',
    KEEP_ALIVE = 'auth/KeepAlive',
    STILL_ALIVE = 'auth/StillAlive',
    LOGOUT = 'auth/Logout',
    LOGGED_OUT = 'auth/LoggedOut',
}

export interface State {
    readonly busy: boolean,
    readonly sessionID?: string,
    readonly username?: string,
    readonly expiry?: Date,
    readonly errors: ReadonlyArray<string>,
}

