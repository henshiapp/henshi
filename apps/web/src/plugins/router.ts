import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { authGuard } from '../guards/auth.ts';
import { adminGuard } from '../guards/admin.ts';

const routes: ReadonlyArray<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../layouts/home/home.vue'),
        children: [
            {
                path: '/',
                component: () => import('../pages/index.vue'),
            },
        ],
    },
    {
        path: '/auth',
        children: [
            {
                path: '/auth/login',
                beforeEnter: [authGuard],
                component: () => import('../pages/auth/login/login.vue'),
            },
            {
                path: '/auth/signup',
                component: () => import('../pages/auth/signup/signup.vue'),
            },
        ],
    },
    {
        path: '/app',
        component: () => import('../layouts/app/app.vue'),
        children: [
            {
                path: '/app/admin',
                beforeEnter: [authGuard, adminGuard],
                children: [
                    {
                        path: '/app/admin/users',
                        component: () => import('../pages/app/admin/users/users.vue'),
                    },
                ],
            },
            {
                path: '/app/dashboard',
                beforeEnter: [authGuard],
                component: () => import('../pages/app/dashboard/dashboard.vue'),
            },
        ],
    },
    {
        path: '/errors',
        component: () => import('../layouts/home/home.vue'),
        children: [
            {
                path: '/errors/403',
                component: () => import('../pages/errors/403/403.vue'),
            },
        ],
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
