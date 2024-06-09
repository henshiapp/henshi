<script setup lang="ts">
import * as Yup from 'yup';
import { ref } from 'vue';
import Image from 'primevue/image';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useForm, useField } from 'vee-validate';
import HInputText from '../../components/HInputText/index.vue';
import HInputPassword from '../../components/HInputPassword/index.vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { api } from '../../api/api.ts';
import { errorToast, successToast } from '../../utils/toast.ts';

const toast = useToast();
const router = useRouter();

interface SignUpForm {
    name: string;
    email: string;
    password: string;
}

const { handleSubmit, meta } = useForm<SignUpForm>({
    validationSchema: Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    }),
});
const name = useField('name');
const email = useField('email');
const password = useField('password');

const isLoading = ref(false);

const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: SignUpForm) => api.post<SignUpForm, any>('/auth/signup', data),
});

const onSubmit = handleSubmit(async (values: SignUpForm) => {
    await signUpMutation.mutateAsync(values);

    if (signUpMutation.error.value) {
        return errorToast(toast, signUpMutation.error);
    }
    if (signUpMutation.data.value) {
        successToast(toast, signUpMutation.data.value.message);

        setTimeout(() => {
            router.push('/auth/login');
        }, 4000);
    }
});
</script>

<template>
    <Toast />
    <div class="flex h-screen">
        <div class="flex-1 hidden md:flex justify-center items-center">
            <RouterLink to="/">
                <Image src="/assets/images/logo-full.svg" width="300" />
            </RouterLink>
        </div>
        <div class="flex-1 flex justify-center items-center bg-primary-50 h-full">
            <div class="bg-white rounded-xl py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                        Create an account
                    </h2>

                    <form @submit.prevent="onSubmit" class="mx-auto max-w-lg rounded-lg">
                        <div class="flex flex-col gap-4 p-4 md:p-8">
                            <HInputText
                                label="Full name"
                                v-model="name.value.value"
                                :errorMessage="name.errorMessage.value"
                            />
                            <HInputText
                                label="Email"
                                v-model="email.value.value"
                                :errorMessage="email.errorMessage.value"
                            />
                            <HInputPassword
                                label="Password"
                                v-model="password.value.value"
                                :errorMessage="password.errorMessage.value"
                            />

                            <Button
                                type="submit"
                                class="font-bold py-1 mt-1"
                                :disabled="!meta.valid || isLoading"
                                :loading="isLoading"
                                >Sign up</Button
                            >

                            <div class="flex items-center justify-center p-4">
                                <p class="text-center text-sm text-gray-500">
                                    Already have an account?
                                    <RouterLink
                                        to="/auth/login"
                                        class="text-primary-500 transition duration-100 hover:text-primary-600 active:text-primary-700"
                                    >
                                        Log in
                                    </RouterLink>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
