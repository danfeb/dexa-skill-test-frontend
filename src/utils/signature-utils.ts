import CryptoJS from 'crypto-js';
import { ApiMethod, SignatureHeaders, SignatureOptions } from '@/types/api-types';

const hashBytes = (data: ArrayBuffer | Uint8Array): string => {
    return CryptoJS.SHA256(CryptoJS.lib.WordArray.create(data)).toString(CryptoJS.enc.Hex);
};

const bodyToString = (body: unknown): string => {
    if (body === undefined || body === null) {
        return '';
    }

    if (typeof body === 'string') {
        return body;
    }

    return JSON.stringify(body);
};

const getPathWithQuery = (url: string): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';

    try {
        const parsedUrl = new URL(url, origin);
        return `${parsedUrl.pathname}${parsedUrl.search}`;
    } catch {
        return url;
    }
};

export const generateFileSha256 = async (file: Blob): Promise<string> => {
    const buffer = await file.arrayBuffer();
    return hashBytes(buffer);
};

export const generateFormDataFileSha256 = async (
    formData: FormData
): Promise<string | undefined> => {
    const files: Blob[] = [];

    formData.forEach((value) => {
        if (value instanceof Blob) {
            files.push(value);
        }
    });

    if (files.length === 0) {
        return undefined;
    }

    if (files.length === 1) {
        return generateFileSha256(files[0]);
    }

    const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
    const totalLength = buffers.reduce((total, buffer) => total + buffer.byteLength, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;

    buffers.forEach((buffer) => {
        merged.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
    });

    return hashBytes(merged);
};

export const createSignature = async (
    url: string,
    method: ApiMethod,
    body?: unknown,
    options: SignatureOptions = {}
): Promise<SignatureHeaders> => {
    const apiKey = options.apiKey || import.meta.env.VITE_API_KEY;
    const apiSecret = options.apiSecret || import.meta.env.VITE_API_SECRET;

    if (!apiKey || !apiSecret) {
        throw new Error('Missing VITE_API_KEY or VITE_API_SECRET.');
    }

    const isMultipart = typeof FormData !== 'undefined' && body instanceof FormData;
    let fileSha256 = options.fileSha256;

    if (isMultipart && !fileSha256) {
        fileSha256 = await generateFormDataFileSha256(body);
    }

    if (isMultipart && !fileSha256) {
        throw new Error('Unable to generate x-file-sha256: no file found in FormData.');
    }

    const timestamp = Date.now().toString();
    const nonce = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    const signatureBody = isMultipart ? (fileSha256 ?? '') : bodyToString(body);
    const payload = [
        method.toUpperCase(),
        getPathWithQuery(url),
        timestamp,
        nonce,
        signatureBody
    ].join('\n');
    const signature = CryptoJS.HmacSHA256(payload, apiSecret).toString(CryptoJS.enc.Hex);

    const headers: SignatureHeaders = {
        'x-api-key': apiKey,
        'x-timestamp': timestamp,
        'x-nonce': nonce,
        'x-signature': signature
    };

    if (fileSha256) {
        headers['x-file-sha256'] = fileSha256;
    }

    return headers;
};
