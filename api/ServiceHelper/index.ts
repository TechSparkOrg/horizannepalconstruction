import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import getEnv from './envschema';

const env = getEnv();

let refreshPromise: Promise<string | null> | null = null;

const getServerCookie = async (name: string) => {
    const { cookies } = await import('next/headers');
    return (await cookies()).get(name)?.value;
};

const setServerCookie = async (
    name: string,
    value: string,
    maxAge: number
) => {
    const { cookies } = await import('next/headers');

    (await cookies()).set(name, value, {
        maxAge,
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
    });
};

const deleteServerCookie = async (name: string) => {
    const { cookies } = await import('next/headers');
    (await cookies()).delete(name);
};

const refreshToken = async (): Promise<string | null> => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const refresh =
                typeof window === 'undefined'
                    ? await getServerCookie('refresh_token')
                    : getCookie('refresh_token');

            if (!refresh) {
                throw new Error('Missing refresh token');
            }

            const response = await axios.post(
                `${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
                {
                    refresh,
                }
            );

            const { access, refresh: newRefresh } = response.data;

            if (!access) {
                throw new Error('Missing access token');
            }

            if (typeof window === 'undefined') {
                await setServerCookie('access_token', access, 86400);
                await setServerCookie('refresh_token', newRefresh, 86400);
            } else {
                setCookie('access_token', access, {
                    maxAge: 86400,
                    path: '/',
                });

                setCookie('refresh_token', newRefresh, {
                    maxAge: 86400,
                    path: '/',
                });
            }

            return access;
        } catch {
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const createAxiosClient = (isPrivate = false): AxiosInstance => {
    const instance = axios.create({
        baseURL: env.NEXT_PUBLIC_API_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (isPrivate) {
        instance.interceptors.request.use(async (config) => {
            const token =
                typeof window === 'undefined'
                    ? await getServerCookie('access_token')
                    : getCookie('access_token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryAxiosRequestConfig;
        const status = error.response?.status;

        if (isPrivate && status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newAccessToken = await refreshToken();

            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            }
        }

        if (status === 401 || status === 403) {
            if (typeof window === 'undefined') {
                await deleteServerCookie('access_token');
                await deleteServerCookie('refresh_token');
            } else {
                deleteCookie('access_token');
                deleteCookie('refresh_token');

                if (!window.location.pathname.startsWith('/admin')) {
                    window.location.href = '/admin/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

    const responseCache = new Map<string, { data: unknown; ts: number }>();
    const CACHE_TTL = 60_000;

    instance.interceptors.response.use(
      (response) => {
        if (response.config.method?.toLowerCase() === "get") {
          const key = `${response.config.url}${JSON.stringify(response.config.params || {})}`;
          responseCache.set(key, { data: response.data, ts: Date.now() });
        }
        return response;
      }
    );

    instance.interceptors.request.use((config) => {
      if (config.method?.toLowerCase() !== "get") {
        responseCache.clear();
      }
      if (config.method?.toLowerCase() === "get") {
        const key = `${config.url}${JSON.stringify(config.params || {})}`;
        const cached = responseCache.get(key);
        if (cached && Date.now() - cached.ts < CACHE_TTL) {
          config.adapter = () =>
            Promise.resolve({
              data: cached.data,
              status: 200,
              statusText: "OK",
              headers: {},
              config,
              request: {},
            } as any);
        }
      }
      return config;
    });

    return instance;
};

export const apiPublic = createAxiosClient(false);

export const apiPrivate = createAxiosClient(true);

export type ApiResponse<T> = {
    data: T;
};

export { getCookie, setCookie, deleteCookie };