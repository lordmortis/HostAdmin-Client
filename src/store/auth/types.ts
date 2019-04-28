export enum ActionTypes {
    LOGIN = 'auth/LogIn',
    LOGGING_IN = 'auth/LoggingIn',
    LOGGED_IN = 'auth/LoggedIn',
}

export interface State {
    readonly busy: boolean,
    readonly sessionID?: string,
    readonly username?: string,
    readonly errors: ReadonlyArray<string>,
};

