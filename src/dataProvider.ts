// import simpleRestProvider from "ra-data-simple-rest";
//
// export const dataProvider = simpleRestProvider(
//   import.meta.env.VITE_SIMPLE_REST_URL,
// );

// src/dataProvider.ts
import {
    DataProvider,
    // DeleteManyParams,
    // DeleteManyResult,
    fetchUtils, PaginationPayload,
    // UpdateManyParams,
    // UpdateManyResult
} from 'react-admin';
import { stringify } from 'query-string';
//import {stringify} from "node:querystring";
//import {json} from "node:stream/consumers";

const apiUrl = 'http://localhost:5227/api';
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage }  = params.pagination;
        const { field, order } = params.sort;

        const query = {
            _page: page,
            _perPage: perPage,
            _sort: field,
            _order: order.toLowerCase(),
            ...fetchUtils.flattenObject(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);

        return {
            data: json.data,
            total: json.total,
        };
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url);
        return { data: json.data };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { json } = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return { data: json.data };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: json.data };
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: json.data };
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
