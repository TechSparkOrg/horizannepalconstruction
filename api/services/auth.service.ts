import { apiPublic, setCookie } from '../ServiceHelper/index';
import type { LoginFormData, LoginResponse } from '../types/auth.types';


export const AuthService = {
    Login: (data: LoginFormData) => {
        return apiPublic.post<LoginResponse>(`/auth/login/`, data).then(res => {
            if (res.data.access && res.data.refresh) {
                setCookie("access_token", res.data.access, { maxAge: 60 * 60 * 24 * 7 });
                setCookie("refresh_token", res.data.refresh, { maxAge: 60 * 60 * 24 * 7 });
            }
            return res.data;
        });
    },


};
