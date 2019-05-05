export enum ActionTypes {
    LOGIN = 'auth/LogIn',
    LOGIN_ERROR = 'auth/Error',
    LOGGED_IN = 'auth/Complete',
    LOGOUT = 'auth/Logout',
}

export interface State {
    readonly busy: boolean,
    readonly sessionID?: string,
    readonly username?: string,
    readonly expiry?: Date,
    readonly errors: ReadonlyArray<string>,
}

