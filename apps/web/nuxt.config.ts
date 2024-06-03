import path from 'path';

const env: Record<string, any> = {
    development: {
        apiUrl: 'http://localhost:8080/api',
    },
    staging: {
        apiUrl: 'http://0.0.0.0:8080/api',
    },
    production: {
        apiUrl: 'http://0.0.0.0:8080/api',
    },
};
const appEnv = process.env.APP_ENV || 'development';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            NUXT_ENV: appEnv,
            apiUrl: env[appEnv].apiUrl,
        },
    },
    devtools: { enabled: true },
    ssr: false,
    devServer: {
        host: '0.0.0.0',
        port: 4200,
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-primevue',
        '@vee-validate/nuxt',
        '@pinia/nuxt',
        "nuxt-viewport"
    ],
    typescript: {
        typeCheck: true,
    },
    imports: {
        autoImport: true,
    },
    css: ['assets/css/styles.css', '@tabler/icons-webfont/dist/tabler-icons.css'],
    tailwindcss: {
        config: {
            content: ['presets/**/*.{js,vue,ts}'],
            theme: {
                extend: {
                    colors: {
                        primary: 'rgb(var(--primary))',
                        'primary-inverse': 'rgb(var(--primary-inverse))',
                        'primary-hover': 'rgb(var(--primary-hover))',
                        'primary-active-color': 'rgb(var(--primary-active-color))',

                        'primary-highlight': 'rgb(var(--primary)/var(--primary-highlight-opacity))',
                        'primary-highlight-inverse': 'rgb(var(--primary-highlight-inverse))',
                        'primary-highlight-hover': 'rgb(var(--primary)/var(--primary-highlight-hover-opacity))',

                        'primary-50': 'rgb(var(--primary-50))',
                        'primary-100': 'rgb(var(--primary-100))',
                        'primary-200': 'rgb(var(--primary-200))',
                        'primary-300': 'rgb(var(--primary-300))',
                        'primary-400': 'rgb(var(--primary-400))',
                        'primary-500': 'rgb(var(--primary-500))',
                        'primary-600': 'rgb(var(--primary-600))',
                        'primary-700': 'rgb(var(--primary-700))',
                        'primary-800': 'rgb(var(--primary-800))',
                        'primary-900': 'rgb(var(--primary-900))',
                        'primary-950': 'rgb(var(--primary-950))',

                        'surface-0': 'rgb(var(--surface-0))',
                        'surface-50': 'rgb(var(--surface-50))',
                        'surface-100': 'rgb(var(--surface-100))',
                        'surface-200': 'rgb(var(--surface-200))',
                        'surface-300': 'rgb(var(--surface-300))',
                        'surface-400': 'rgb(var(--surface-400))',
                        'surface-500': 'rgb(var(--surface-500))',
                        'surface-600': 'rgb(var(--surface-600))',
                        'surface-700': 'rgb(var(--surface-700))',
                        'surface-800': 'rgb(var(--surface-800))',
                        'surface-900': 'rgb(var(--surface-900))',
                        'surface-950': 'rgb(var(--surface-950))',
                    },
                },
            },
        },
    },
    primevue: {
        options: {
            unstyled: true,
            ripple: true,
        },
        importPT: { from: path.resolve(__dirname, './presets/aura/') },
    },
});