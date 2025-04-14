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

        const query = {
            page: page,
            pageSize: perPage,
            sortField: field,
            sortOrder: order,
            ...(params.filter || {})
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
                data: json.data,
                total: json.total,
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
        const url = `${apiUrl}/${resource}`;
        const { json } = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return json;
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });

        return json;
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

    // Опціонально - для підтримки фільтрів у списках
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
        // Відправляємо запити на видалення паралельно
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
        // Відправляємо запити на оновлення паралельно
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
