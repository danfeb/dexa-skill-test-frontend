/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_UCARE_CDN: string;
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_API_MASTER?: string;
    readonly VITE_API_ATTENDANCE?: string;
    readonly VITE_API_ATTACHMENTS?: string;
    readonly VITE_API_KEY?: string;
    readonly VITE_API_SECRET?: string;
    readonly VITE_API_AUTH?: string;
    readonly VITE_UID_SECRET?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
