import * as base from './base'

export interface UserModel {
    id?: string;
    username: string;
    email: string;
    superAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    newPassword?: string;
    passwordConfirmation?: string;
}

export interface UserListResponse {
    data: Array<UserModel>;
    totalRecords: number;
}

interface UserWebModel {
    id?: string;
    username: string;
    email: string;
    super_admin: boolean;
    created_at?: Date;
    updated_at?: Date;
    new_password?: string;
    password_confirmation?: string;
}

function parseModel(data: any):UserModel {
    return {
        id: data.id,
        username: data.username,
        email: data.email,
        superAdmin: data.super_admin,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
    }
}

function unParseModel(data: UserModel):UserWebModel {
    const fixedData : UserWebModel = {
        id: data.id,
        username: data.username,
        email: data.email,
        super_admin: data.superAdmin,
    }

    if (data.newPassword != null) {
        fixedData.new_password = data.newPassword;
    }

    if (data.passwordConfirmation != null) {
        fixedData.password_confirmation = data.newPassword;
    }

    return fixedData;
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
        body: JSON.stringify(unParseModel(data))
    };

    const urlPath = data.id === undefined ? "/1/users" : `/1/user/${data.id}`;

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
