import type { UseFetchOptions } from '#app';
import defu from 'defu';

export function useApi<T>(url: string, options: UseFetchOptions<T> = {}) {
    const config = useRuntimeConfig();

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiUrl,
        key: url,
        credentials: 'include',
        server: false,
        retry: 1,
        retryStatusCodes: [401],
        async onResponseError(context) {
            if (context.response.status === 401) {
                const refresh = await useFetch('/auth/refresh', {
                    baseURL: config.public.apiUrl,
                    credentials: 'include',
                    server: false,
                });

                if (refresh.error.value) {
                    await navigateTo('/auth/login');
                }
            }
        },
    };

    const params = defu(options, defaults);

    return useFetch(url, params);
}
