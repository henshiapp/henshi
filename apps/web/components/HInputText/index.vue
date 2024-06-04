<script setup lang="ts">
const props = defineProps<{
    label: string;
    errorMessage?: string;
}>();
const model = defineModel<any>();
</script>

<template>
    <div class="flex flex-col gap-2">
        <label for="value">{{ props.label }}</label>
        <div class="flex flex-col">
            <InputText id="value" v-model="model" type="text" :invalid="!!props.errorMessage" />
            <small v-if="props.errorMessage" id="text-error" class="text-red-500">{{ props.errorMessage }}</small>
        </div>
    </div>
</template>
