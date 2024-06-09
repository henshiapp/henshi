<script setup lang="ts">
import Password from 'primevue/password';

const props = defineProps<{
    label: string;
    errorMessage?: string;
}>();
const model = defineModel<any>();
</script>

<template>
    <div class="flex flex-col gap-2">
        <label for="password">{{ props.label }}</label>
        <div class="flex flex-col">
            <Password
                id="password"
                :inputStyle="{ width: '100%' }"
                v-model="model"
                :feedback="false"
                toggleMask
                :invalid="!!props.errorMessage"
            />
            <small v-if="props.errorMessage" id="text-error" class="text-red-500">{{ props.errorMessage }}</small>
        </div>
    </div>
</template>
