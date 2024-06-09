import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../stores/auth.ts';
import { api } from '../api/api.ts';
import { UserJwt } from '@henshi/types';

export const authGuard: NavigationGuard = async (to) => {
    const authStore = useAuthStore();

    if (!authStore.user) {
        try {
            const { data: user } = await api.get<UserJwt>('/auth/me');

            if (!user && to.path !== '/auth/login') {
                return { path: '/auth/login' };
            }

            authStore.setAuthUser(user);
        } catch (e) {
            if (to.path !== '/auth/login') {
                return { path: '/auth/login' };
            }
        }
    }

    if (to.path === '/auth/login' && authStore.user) {
        return { path: '/app/dashboard' };
    }
};
