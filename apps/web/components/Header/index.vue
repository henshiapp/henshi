<script setup lang="ts"></script>

<template>
    <header class="flex justify-center p-2 sticky top-0 z-50 backdrop-blur-md">
        <div class="flex justify-between items-center container py-2 max-w-6xl">
            <NuxtLink to="/">
                <Image src="/assets/images/logo-full-black.svg" width="150" />
            </NuxtLink>
            <div class="flex gap-2">
                <NuxtLink to="/auth/login">
                    <Button label="Log In" rounded text />
                </NuxtLink>
                <NuxtLink to="/auth/signup">
                    <Button label="Sign Up" rounded />
                </NuxtLink>
            </div>
        </div>
    </header>
</template>
