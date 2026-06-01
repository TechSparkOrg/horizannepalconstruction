import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import getEnv from './envchema';

const env = getEnv();

let refreshPromise: Promise<string | null> | null = null;

const getServerCookie = async (name: string) => {
    const { cookies } = await import('next/headers');
    return (await cookies()).get(name)?.value;
};

const setServerCookie = async (name: string, value: string, maxAge: number) => {
    const { cookies } = await import('next/headers');
    (await cookies()).set(name, value, { maxAge });
};

const refresh = async (): Promise<string | null> => {
    if (refreshPromise) return refreshPromise;
    return refreshPromise = (async () => {
        try {
            const refreshToken = typeof window === 'undefined'
                ? await getServerCookie('refresh_token')
                : getCookie('refresh_token');

            if (!refreshToken) throw new Error('Missing refresh token');

            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
                cache: 'no-store'
            });

            if (!res.ok) throw new Error(`Refresh failed with ${res.status}`);

            const { access } = await res.json();
            if (!access) throw new Error('Missing access token');

            if (typeof window === 'undefined') {
                await setServerCookie('access_token', access, 86400);
            } else {
                setCookie('access_token', access, { maxAge: 86400 });
            }

            return access;
        } catch {
            return null;
        } finally {
            refreshPromise = null;
        }
    })();
};

interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

type FetchResponse<T> = { data: T; status: number; headers: Headers };
type LooseResponse = ReturnType<typeof JSON.parse>;

type ApiError = Error & {
    response?: {
        status: number;
        data: unknown;
        headers: Record<string, string>;
    };
};

const request = async <T>(baseUrl: string, isPrivate: boolean, path: string, init: FetchOptions = {}, retry = 0): Promise<FetchResponse<T>> => {
    const url = new URL(path.startsWith('http') ? path : `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`);
    if (init.params) Object.entries(init.params).forEach(([k, v]) => v != null && url.searchParams.append(k, String(v)));

    const headers = new Headers(init.headers);
if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
}

    if (isPrivate) {
        const token = typeof window === 'undefined' 
            ? await getServerCookie('access_token')
            : getCookie('access_token');
        if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(url.href, { ...init, headers});

    if (res.status === 429 && retry < 3) {
        await new Promise(r => setTimeout(r, 1000 * (retry + 1)));
        return request(baseUrl, isPrivate, path, init, retry + 1);
    }

    if (isPrivate && res.status === 401 && retry === 0) {
        const token = await refresh();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            return request(baseUrl, isPrivate, path, { ...init, headers }, 1);
        }
    }

    let data;
    try {
        data = await res.json();
    } catch {
        data = await res.text().catch(() => 'Unknown server error');
    }
    if (!res.ok) {
        const err: ApiError = new Error(`HTTP ${res.status}`);
        err.response = { status: res.status, data, headers: Object.fromEntries(res.headers) };
        throw err;
    }
    return { data, status: res.status, headers: res.headers };
};

const getBody = (body: unknown) => {
    if (body === undefined) return null;
    if (body instanceof FormData) return body;
    return JSON.stringify(body);
};

const create = (baseUrl: string, isPrivate = false) => ({
    get: <T = LooseResponse>(p: string, o?: FetchOptions) => request<T>(baseUrl, isPrivate, p, { ...o, method: 'GET' }),
    post: <T = LooseResponse>(p: string, b?: unknown, o?: FetchOptions) => request<T>(baseUrl, isPrivate, p, { ...o, method: 'POST', body: getBody(b) }),
    put: <T = LooseResponse>(p: string, b?: unknown, o?: FetchOptions) => request<T>(baseUrl, isPrivate, p, { ...o, method: 'PUT', body: getBody(b) }),
    patch: <T = LooseResponse>(p: string, b?: unknown, o?: FetchOptions) => request<T>(baseUrl, isPrivate, p, { ...o, method: 'PATCH', body: getBody(b) }),
    delete: <T = LooseResponse>(p: string, o?: FetchOptions) => request<T>(baseUrl, isPrivate, p, { ...o, method: 'DELETE' }),
});

export const apiPublic = create(env.NEXT_PUBLIC_API_URL);
export const apiPrivate = create(env.NEXT_PUBLIC_API_URL, true);

export { setCookie, deleteCookie, getCookie };
