import { defineStore } from 'pinia';
import type { UserJwt } from '@henshi/types';

export type AuthStoreState = {
    user: UserJwt | null;
};

export const useAuthStore = defineStore({
    id: 'authStore',
    state: (): AuthStoreState => ({
        user: null,
    }),
    getters: {
        firstName({ user }) {
            return user?.name.split(' ').at(0);
        },
    },
    actions: {
        setAuthUser(user: AuthStoreState['user']) {
            this.user = user;
        },
    },
});

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
// }
