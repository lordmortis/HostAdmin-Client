export interface LoginResponse {
    expiry: Date,
    sessionID: string,
}

export function Login(username: string, password:string) : Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        console.log("Login with: " + username + " " + password);
        setTimeout(() => {
            reject("ERROR!");
/*            resolve({
                expiry: new Date(),
                sessionID: "junk",
            });*/
        }, 1000);
    });
}
