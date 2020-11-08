import * as base from './base'

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
    const options = {
        method: "GET"
    };

    return fetch(base.urlBase + "/1/domains", base.addDefaults(options))
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

/*export function Get(id: string) : Promise<DomainResponse> {

}*/

export function CreateOrUpdate(data: DomainModel) : Promise<DomainModel> {
    const options = {
        method: data.id === undefined ? "POST" : "PUT",
        body: JSON.stringify(data)
    };

    const urlPath = data.id === undefined ? "/1/domains" : `/1/domains/${data.id}/`;

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
