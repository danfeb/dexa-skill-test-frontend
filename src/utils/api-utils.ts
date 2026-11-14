import axios, { AxiosRequestConfig } from 'axios';
import { createSignature } from '@/utils/signature-utils';

const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
            const theme: string[] = ['theme'];

            if (typeof window !== 'undefined') {
                const keysToRemove: string[] = [];

                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);

                    if (key && !theme.includes(key)) {
                        keysToRemove.push(key);
                    }
                }

                keysToRemove.forEach((key) => localStorage.removeItem(key));
                sessionStorage.clear();
                window.location.replace('/auth/login');
            }
        } else if (status === 403) {
            window.location.replace('/pages/forbidden');
        }
    }

    throw error;
};

export const get = async (
    url: string,
    params: any = {},
    responseType: AxiosRequestConfig['responseType'] = 'json'
): Promise<any> => {
    const token = localStorage.getItem('token');
    const query = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query.append(key, String(value));
        }
    });

    const queryString = query.toString();
    const requestUrl = queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
    const signatureHeaders = await createSignature(requestUrl, 'GET');

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            ...signatureHeaders
        },
        responseType
    };

    try {
        const response = await axios.get(requestUrl, config);
        return response.data;
    } catch (error: unknown) {
        handleApiError(error);
    }
};

export const post = async (
    url: string,
    body: any,
    responseType: AxiosRequestConfig['responseType'] = 'json'
): Promise<any> => {
    const token = localStorage.getItem('token');
    const signatureHeaders = await createSignature(url, 'POST', body || {});

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            ...signatureHeaders
        },
        responseType
    };

    try {
        const response = await axios.post(url, body, config);
        return response.data;
    } catch (error: unknown) {
        handleApiError(error);
    }
};

export const postLogin = async (
    url: string,
    body: any,
    responseType: AxiosRequestConfig['responseType'] = 'json'
): Promise<any> => {
    const signatureHeaders = await createSignature(url, 'POST', body || {});

    const config: AxiosRequestConfig = {
        headers: {
            ...signatureHeaders
        },
        responseType
    };

    const response = await axios.post(url, body, config);
    return response.data;
};

export const patch = async (
    url: string,
    body: any,
    responseType: AxiosRequestConfig['responseType'] = 'json'
): Promise<any> => {
    const token = localStorage.getItem('token');
    const signatureHeaders = await createSignature(url, 'PATCH', body || {});

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            ...signatureHeaders
        },
        responseType
    };

    try {
        const response = await axios.patch(url, body, config);
        return response.data;
    } catch (error: unknown) {
        handleApiError(error);
    }
};

export const del = async (
    url: string,
    responseType: AxiosRequestConfig['responseType'] = 'json'
): Promise<any> => {
    const token = localStorage.getItem('token');
    const signatureHeaders = await createSignature(url, 'DELETE');

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            ...signatureHeaders
        },
        responseType
    };

    try {
        const response = await axios.delete(url, config);
        return response.data;
    } catch (error: unknown) {
        handleApiError(error);
    }
};
