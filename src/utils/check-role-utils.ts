import { decodeToken } from '@/utils/jwt-decoder-utils';

export const checkRole = (role: string | string[]): boolean => {
    const payload = decodeToken();

    if (payload === null) {
        return false;
    }

    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(payload.role);
};
