<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const props = defineProps<{
    label: string;
    options: any[];
    placeholder?: string;
    errorMessage?: string;
}>();
const model = defineModel<any>();
</script>

<template>
    <div class="flex flex-col gap-2">
        <label for="value">{{ props.label }}</label>
        <div class="flex flex-col">
            <Dropdown
                v-model="model"
                :options="props.options"
                optionLabel="name"
                :placeholder="placeholder"
                :invalid="!!props.errorMessage"
            />
            <small v-if="props.errorMessage" id="text-error" class="text-red-500">{{ props.errorMessage }}</small>
        </div>
    </div>
</template>
