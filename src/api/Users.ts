import * as base from './base'

export interface UserModel {
    id?: string;
    username: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    password?: string;
    passwordConfirmation?: string;
}

export interface UserListResponse {
    data: Array<UserModel>;
    totalRecords: number;
}

function parseModel(data: any):UserModel {
    return {
        id: data.id,
        username: data.username,
        email: data.email,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
    }
}

export function List(offset: number, limit: number) : Promise<UserListResponse> {
    const options = {
        method: "GET"
    };

    return fetch(base.urlBase + "/1/users", base.addDefaults(options))
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

export function CreateOrUpdate(data: UserModel) : Promise<UserModel> {
    const options = {
        method: data.id === undefined ? "POST" : "PUT",
        body: JSON.stringify(data)
    };

    const urlPath = data.id === undefined ? "/1/users" : `/1/user/${data.id}/`;

    return fetch(base.urlBase + urlPath, base.addDefaults(options))
        .then(response => {
            if (response.status !== 200) {
                throw new Error("Server Error: " + response.status);
            }
            return response.json().then(decodedResponse => {
                return parseModel(decodedResponse);
            });
        });
}
