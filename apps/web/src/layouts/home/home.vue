<script setup lang="ts">
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-col min-h-screen min-w-screen">
        <Header></Header>

        <main class="flex-grow">
            <div class="max-w-6xl mx-auto">
                <RouterView />
            </div>
        </main>

        <Footer></Footer>
    </div>
</template>
