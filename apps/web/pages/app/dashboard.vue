<script setup lang="ts">
useHead({
    title: 'Dashboard - Henshi',
});

definePageMeta({
    middleware: ['auth'],
    layout: 'app',
});
</script>

<template>dashboard</template>

<style scoped></style>
