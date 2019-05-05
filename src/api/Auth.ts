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
    return fetch(base.urlBase + "/1/login", Object.assign(options, base.defaults))
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
                throw new Error("Invalid username/password");
            }
            if (response.status >= 500 && response.status <= 600) {
                throw new Error("Server error: " + response.status);
            }
            throw new Error("Unknown error: " + response.status);
        });
}
