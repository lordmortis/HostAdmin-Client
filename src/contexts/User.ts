import React from 'react';

export interface Interface {
    auth: boolean,
    sessionID?: string,
    username?: string,
}

export const {Provider, Consumer} = React.createContext<Interface>({
    auth: false,
    sessionID: undefined,
    username: undefined,
});
