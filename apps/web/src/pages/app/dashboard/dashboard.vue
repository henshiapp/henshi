<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth.ts';

const user = useAuthStore();
</script>

<template>
    <p class="text-2xl">
        Welcome, <span class="font-bold">{{ user.firstName }}</span>
    </p>
</template>

<style scoped></style>
