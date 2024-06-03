import { useAuthStore } from '~/stores/auth';
import { UserRole } from '@henshi/types';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const userRole = authStore.user?.role;

    if (!userRole) {
        if (to.path !== '/auth/login') {
            return navigateTo('/auth/login');
        }
    }

    // @ts-ignore
    if (UserRole[userRole] !== UserRole.ADMIN) {
        if (to.path !== '/errors/403') {
            return navigateTo('/errors/403');
        }
    }
});
