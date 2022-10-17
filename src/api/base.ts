import {UserListResponse, UserModel} from "./Users";

export interface ListResponse<Type> {
    data: Array<Type>;
    totalRecords: number;
}

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

const currentDefaults = Object.assign({}, baseDefaults);

export function setSessionID(sessionID: string) {
    // @ts-ignore
    currentDefaults.headers["Authorization"] = `Bearer ${sessionID}`;
}

export function clearSessionID() {
    // @ts-ignore
    delete(currentDefaults.headers["Authorization"]);
    console.log("Current Defaults:");
    console.log(currentDefaults);
}

export function addDefaults(options: object | null):object {
    if (options == null) options = {};
    return Object.assign(options, currentDefaults);
}

export function arrayFetch<Type>(url:string, parseModel:(data:any) => Type) : Promise<ListResponse<Type>> {
    return fetch(url, addDefaults({method: "GET"}))
        .then(response => {
            if (response.status !== 200) {
                throw new Error("Server Error: " + response.status);
            }
            return response.json().then(decodedResponse => {
                return {
                    data: decodedResponse.models.map(parseModel),
                    totalRecords: decodedResponse.meta.total,
                }
            });
        });
}