import {
    DataProvider,
    fetchUtils
} from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:5227/api';
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};

        let sortField = field;

        if (field !== 'id') {
            sortField = field.charAt(0).toUpperCase() + field.slice(1);
        } else {
            sortField = 'Id';
        }

        const query = {
            page: page,
            pageSize: perPage,
            sort: sortField,
            order: order,
            ...params.filter
        };

        Object.keys(query).forEach(key => {
            if (query[key] === undefined || query[key] === '') {
                delete query[key];
            }
        });

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        try {
            const { json } = await httpClient(url);

            return {
                data: json.data || json.items || [],
                total: json.total || json.data?.length || json.items?.length || 0,
            };
        } catch (error) {
            console.error('Error in getList:', error);
            throw error;
        }
    },


    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url);

        return json;
    },

    create: async (resource, params) => {
        try {
            const url = `${apiUrl}/${resource}`;
            const { json } = await httpClient(url, {
                method: 'POST',
                body: JSON.stringify(params.data),
            });

            if (typeof json === 'number') {
                return {
                    data: {
                        ...params.data,
                        id: json
                    }
                };
            }

            if (json && !json.data && !json.id) {
                return {
                    data: {
                        ...params.data,
                        id: json.id || json
                    }
                };
            }

            return { data: json.data || json };
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        try {
            const { json } = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });

            if (json && typeof json === 'object') {
                return { data: json.data || json };
            }
            return {
                data: { ...params.data, id: params.id }
            };
        } catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}/softDelete`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({}),
        });
        return { data: json };
    },

    getMany: async (resource, params) => {
        const query = {
            id: params.ids,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);
        return { data: json.data };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            _page: page,
            _perPage: perPage,
            _sort: field,
            _order: order.toLowerCase(),
            [params.target]: params.id,
            ...fetchUtils.flattenObject(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);

        return {
            data: json.data,
            total: json.total,
        };
    },
    deleteMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        );

        return { data: responses.map(({ json }) => json.data) };
    },

    updateMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        );

        return { data: responses.map(({ json }) => json.data) };
    },
};
