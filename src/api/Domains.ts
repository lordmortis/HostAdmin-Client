import * as base from './base'

export interface DomainModel {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DomainListResponse {
    data: Array<DomainModel>;
    totalRecords: number;
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
            return response.json().then(dataArray => {
                const array = [];
                for (let index in dataArray) {
                    const data = dataArray[index];
                    array.push({
                        id: data.id,
                        name: data.name,
                        createdAt: new Date(data.created_at),
                        updatedAt: new Date(data.updated_at),
                    })
                }
                return {
                    data: array,
                    totalRecords: 100,
                }
            })
        });
}

/*export function Get(id: string) : Promise<DomainResponse> {

}*/