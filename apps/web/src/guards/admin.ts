import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../stores/auth.ts';
import { UserRole } from '@henshi/types';

export const adminGuard: NavigationGuard = async (to) => {
    const authStore = useAuthStore();
    const userRole = authStore.user?.role;

    if (userRole === undefined || userRole === null) {
        if (to.path !== '/auth/login') {
            return { path: '/auth/login' };
        }
        return { path: '/' };
    }

    if (userRole !== UserRole.ADMIN) {
        if (to.path !== '/errors/403') {
            return { path: '/errors/403' };
        }
    }
};
