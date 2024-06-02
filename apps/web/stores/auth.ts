import { acceptHMRUpdate, defineStore } from 'pinia';

export type AuthStoreState = {
    user: any;
};

export const useAuthStore = defineStore({
    id: 'authStore',
    state: (): AuthStoreState => ({
        user: null,
    }),
    getters: {},
    actions: {
        setAuthUser(user: any) {
            this.user = user;
        },
    },
});

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
// }
