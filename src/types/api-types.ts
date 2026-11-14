export type ApiMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface SignatureHeaders {
    'x-api-key': string;
    'x-timestamp': string;
    'x-nonce': string;
    'x-signature': string;
    'x-file-sha256'?: string;
}

export interface SignatureOptions {
    fileSha256?: string;
    apiKey?: string;
    apiSecret?: string;
}
