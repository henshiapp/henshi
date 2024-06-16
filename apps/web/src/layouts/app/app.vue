<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { errorToast } from '../../utils/toast';
import { api } from '../../api/api.ts';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'primevue/usetoast';
import Image from 'primevue/image';
import Toast from 'primevue/toast';
import OverlayPanel from 'primevue/overlaypanel';
import Avatar from 'primevue/avatar';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { AxiosError } from 'axios';

const sidebarItems = [
    {
        label: 'Dashboard',
        icon: 'ti ti-dashboard',
        path: '/app/dashboard',
        new: false,
    },
    {
        label: 'Admin',
        children: [
            {
                label: 'Users',
                icon: 'ti ti-user',
                path: '/app/admin/users',
                new: false,
            },
        ],
    },
];

const { user, setAuthUser } = useAuthStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const userMenu = ref();

const toggleUserMenu = (event: any) => {
    userMenu.value.toggle(event);
};

const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => api.get('/auth/logout'),
});

const logout = async () => {
    try {
        await logoutMutation.mutateAsync();
        setAuthUser(null);
        await router.push('/');
    } catch (e) {
        if (e instanceof AxiosError) errorToast(toast, e);
    }
};
</script>

<template>
    <Toast />
    <nav class="fixed top-0 z-50 w-full border-b bg-zinc-950 border-zinc-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start rtl:justify-end">
                    <button
                        type="button"
                        class="inline-flex items-center p-2 text-sm text-zinc-500 rounded-lg sm:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
                        @click="toggleSidebar"
                    >
                        <span class="sr-only">Open sidebar</span>
                        <svg
                            class="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            ></path>
                        </svg>
                    </button>
                    <RouterLink to="/" class="flex ms-2 md:me-24">
                        <Image src="/assets/images/logo-full.svg" width="125" class="h-8 me-3" alt="Henshi Logo" />
                    </RouterLink>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ms-3">
                        <div>
                            <button
                                type="button"
                                class="flex text-sm bg-zinc-800 rounded-full focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-600"
                                @click="toggleUserMenu"
                            >
                                <span class="sr-only">Open user menu</span>
                                <Avatar
                                    icon="ti ti-user"
                                    size="normal"
                                    shape="circle"
                                    style="background-color: #f5cb5c"
                                />
                            </button>
                        </div>

                        <OverlayPanel ref="userMenu" :pt="{ content: 'p-0' }">
                            <div
                                class="text-base list-none divide-y rounded shadow bg-zinc-700 divide-zinc-600"
                                id="dropdown-user"
                            >
                                <div class="px-4 py-3" role="none">
                                    <p class="text-sm font-bold text-zinc-900 dark:text-white" role="none">
                                        {{ user?.name }}
                                    </p>
                                    <p
                                        class="text-sm font-medium text-zinc-900 truncate dark:text-zinc-300"
                                        role="none"
                                    >
                                        {{ user?.email }}
                                    </p>
                                </div>
                                <ul class="py-1" role="none">
                                    <li>
                                        <RouterLink
                                            to="#"
                                            class="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
                                            role="menuitem"
                                            >Settings</RouterLink
                                        >
                                    </li>
                                    <li>
                                        <RouterLink
                                            to="#"
                                            @click="logout"
                                            class="cursor-pointer block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
                                            role="menuitem"
                                            >Sign out</RouterLink
                                        >
                                    </li>
                                </ul>
                            </div>
                        </OverlayPanel>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -tranzinc-x-full border-r sm:tranzinc-x-0 bg-zinc-950 border-zinc-700"
        :class="{
            hidden: !isSidebarOpen,
        }"
        aria-label="Sidebar"
    >
        <div class="flex text-white flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-zinc-950">
            <ul class="space-y-2 font-medium">
                <li v-for="item of sidebarItems">
                    <div v-if="item.children">
                        <p class="mb-2">{{ item.label }}</p>
                        <div v-for="child of item.children">
                            <RouterLink
                                :to="child.path"
                                class="flex items-center p-2 my-2 rounded-lg text-white hover:text-primary-300 group"
                                :class="{
                                    'bg-zinc-700': route.path === child.path,
                                }"
                            >
                                <i :class="child.icon"></i>
                                <span class="ms-3 mt-1">{{ child.label }}</span>
                            </RouterLink>
                        </div>
                    </div>
                    <RouterLink
                        v-else
                        :to="item.path"
                        class="flex items-center p-2 rounded-lg text-white hover:text-primary-300 group"
                        :class="{
                            'bg-zinc-700': route.path === item.path,
                        }"
                    >
                        <i :class="item.icon"></i>
                        <span class="ms-3 mt-1">{{ item.label }}</span>
                        <span
                            v-if="item.new"
                            class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-300"
                            >New</span
                        >
                    </RouterLink>
                </li>
            </ul>
            <div v-if="!user?.emailConfirmed" id="dropdown-cta" class="p-4 mt-6 rounded-lg bg-yellow-50" role="alert">
                <div class="flex items-center mb-3">
                    <span class="bg-yellow-100 text-yellow-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded"
                        >Attention</span
                    >
                </div>
                <p class="mb-3 text-sm text-gray-800">
                    You haven't confirmed your email yet. Confirm it to use all features the app provides.
                </p>
                <a class="text-sm text-yellow-800 underline font-medium hover:text-yellow-900" href="#"
                    >Resend email confirmation</a
                >
            </div>
        </div>
    </aside>

    <div class="p-6 sm:ml-64 mt-14 text-white">
        <RouterView />
    </div>
</template>

<style>
body {
    background-color: #18181b;
}
</style>
