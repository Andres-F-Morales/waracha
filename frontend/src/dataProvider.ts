import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const AUTH_TOKEN_KEY = 'authToken';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    if (token) {
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

export const dataProvider = simpleRestProvider(API_URL, httpClient);