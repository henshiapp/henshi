<script setup lang="ts">
useHead({
    title: 'Dashboard - Henshi',
});
definePageMeta({
    middleware: ['auth'],
    layout: 'app',
});

const user = useAuthStore();
</script>

<template>
    <p class="text-2xl">
        Welcome, <span class="font-bold">{{ user.firstName }}</span>
    </p>
</template>

<style scoped></style>
