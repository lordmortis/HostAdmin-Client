import * as base from './base'

export interface LoginResponse {
    expiry: Date,
    sessionID: string,
}

export function Login(username: string, password:string) : Promise<LoginResponse> {
    const options = {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
    };
    return fetch(base.urlBase + "/1/login", base.addDefaults(options))
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    base.setSessionID(data.sessionID);
                    return {
                        expiry: new Date(data.expiry),
                        sessionID: data.sessionID,
                    }
                });
            }
            if (response.status === 401) {
                base.clearSessionID();
                throw new Error("Invalid username/password");
            }
            if (response.status >= 500 && response.status <= 600) {
                throw new Error("Server error: " + response.status);
            }
            throw new Error("Unknown error: " + response.status);
        });
}

export function SessionKeepalive() : Promise<LoginResponse> {
    const options = {
        method: "GET"
    };
    return fetch(`${base.urlBase}/1/auth/keepalive`, base.addDefaults(options))
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    return {
                        expiry: new Date(data.expiry),
                        sessionID: data.sessionID,
                    }
                });
            }
            if (response.status === 401) {
                base.clearSessionID();
                throw new Error("Invalid username/password");
            }
            if (response.status >= 500 && response.status <= 600) {
                throw new Error("Server error: " + response.status);
            }
            throw new Error("Unknown error: " + response.status);
        });
}

export function Logout(): Promise<boolean> {
    const options = {
        method: "POST",
    };
    return fetch(`${base.urlBase}/1/auth/logout`, base.addDefaults(options))
        .then(() => {
            base.clearSessionID();
            return true;
        });
}
