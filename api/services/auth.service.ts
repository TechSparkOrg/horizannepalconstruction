import { apiPublic, apiPrivate, setCookie } from '../ServiceHelper/index';
import type { LoginFormData, LoginResponse, AuthUser } from '../types/auth.types';


export const AuthService = {
    login: async (data: LoginFormData) => {
        return apiPublic.post<LoginResponse>(`/auth/login/`, data).then(async res => {
            console.log('Login response:', res.data);
            if (res.data.access && res.data.refresh) {
                await setCookie("access_token", res.data.access, { maxAge: 60 * 60 * 24 * 7 });
                await setCookie("refresh_token", res.data.refresh, { maxAge: 60 * 60 * 24 * 7 });
            }
            return res.data;
        });
    },

    me: () =>
        apiPrivate.get<AuthUser>('/auth/me/').then(r => r.data),
};
