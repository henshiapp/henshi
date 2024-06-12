<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Image from 'primevue/image';
import Button from 'primevue/button';
</script>

<template>
    <header class="flex justify-center p-2 sticky top-0 z-50 backdrop-blur-md">
        <div class="flex justify-between items-center container py-2 max-w-6xl">
            <RouterLink to="/">
                <Image src="/assets/images/logo-full-black.svg" width="150" />
            </RouterLink>
            <div class="flex gap-2">
                <RouterLink to="/auth/login">
                    <Button label="Log In" rounded text />
                </RouterLink>
                <RouterLink to="/auth/signup">
                    <Button label="Sign Up" rounded />
                </RouterLink>
            </div>
        </div>
    </header>
</template>
