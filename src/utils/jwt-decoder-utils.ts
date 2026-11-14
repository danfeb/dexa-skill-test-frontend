import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/interfaces/jwt-payload-interfaces';

export const decodeToken = (): JwtPayload | null => {
    try {
        return jwtDecode(localStorage.getItem('token') ?? '');
    } catch {
        return null;
    }
};
