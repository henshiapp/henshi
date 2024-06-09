import { createApp } from 'vue';
import './style.css';
import '@tabler/icons-webfont/dist/tabler-icons.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Aura from './presets/aura';
import { router } from './plugins/router';

const pinia = createPinia();
const app = createApp(App);

app.use(VueQueryPlugin);
app.use(pinia);
app.use(PrimeVue, {
    unstyled: true,
    pt: Aura,
});
app.use(ToastService);
app.use(router);

app.mount('#app');
