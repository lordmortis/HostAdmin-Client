export const urlBase = "http://localhost:3000";

const baseDefaults = Object.freeze({
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer"
});

let currentDefaults = Object.assign({}, baseDefaults);

export function setSessionID(sessionID: string) {
    currentDefaults = Object.assign({}, baseDefaults);
    // @ts-ignore
    currentDefaults.headers["Authorization"] = `Bearer ${sessionID}`;
}

export function clearSessionID() {
    currentDefaults = Object.assign({}, baseDefaults);
    console.log("Current Defaults are:");
    console.log(currentDefaults);
}

export function addDefaults(options: object | null):object {
    if (options == null) options = {};
    return Object.assign(options, currentDefaults);
}

