import * as base from './base'

export interface UserModel {
    id?: string;
    username: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    oldPassword?: string;
    newPassword?: string;
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
    const url = `${base.urlBase}/1/users?offset=${offset}&limit=${limit}`
    return base.arrayFetch<UserModel>(url, parseModel);
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
