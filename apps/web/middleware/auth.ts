import { useAuthStore } from '~/stores/auth';
import { useApi } from '#imports';
import type { UserJwt } from '@henshi/types';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    if (!authStore.user) {
        const authResult = await useApi<UserJwt>('/auth/me');
        const user = authResult.data.value;

        if (!user && to.path !== '/auth/login') {
            return navigateTo('/auth/login');
        }

        authStore.setAuthUser(user);
    }

    if (to.path === '/auth/login' && authStore.user) {
        return navigateTo('/app/dashboard');
    }
});
