import * as base from './base'
import {UserListResponse, UserModel} from "./Users";

export interface DomainModel {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DomainListResponse {
    data: Array<DomainModel>;
    totalRecords: number;
}

function parseModel(data: any):DomainModel {
    return {
        id: data.id,
        name: data.name,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
    }
}

export function List(offset: number, limit: number) : Promise<DomainListResponse> {
    const url = `${base.urlBase}/1/domains?offset=${offset}&limit=${limit}`
    return base.arrayFetch<DomainModel>(url, parseModel);
}

export function CreateOrUpdate(data: DomainModel) : Promise<DomainModel> {
    const options = {
        method: data.id === undefined ? "POST" : "PUT",
        body: JSON.stringify(data)
    };

    const urlPath = data.id === undefined ? "/1/domains" : `/1/domain/${data.id}/`;

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
