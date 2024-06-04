<script setup lang="ts"></script>

<template>
    <div class="flex flex-col min-h-screen min-w-screen">
        <Header></Header>

        <main class="flex-grow">
            <div class="max-w-6xl mx-auto">
                <slot />
            </div>
        </main>

        <Footer></Footer>
    </div>
</template>
