<script setup lang="ts">
import * as Yup from 'yup';
import { getErrorMessage } from '~/api/utils/get-error-message';
import { errorToast } from '~/utils/toast';

const toast = useToast();

interface LoginForm {
    email: string;
    password: string;
}

const { handleSubmit, meta } = useForm<LoginForm>({
    validationSchema: Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    }),
});
const email = useField('email');
const password = useField('password');

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values: LoginForm) => {
    isLoading.value = true;
    const { data, pending, error } = await useApi<{ accessToken: string }>('/auth/login', {
        method: 'POST',
        body: values,
    });
    isLoading.value = false;

    if (error.value) {
        return errorToast(toast, error);
    }
    if (data.value) {
        await navigateTo('/app/dashboard');
    }
});
</script>

<template>
    <Toast />
    <div class="flex h-screen">
        <div class="hidden md:flex flex-1 justify-center items-center">
            <NuxtLink to="/">
                <Image src="/assets/images/logo-full.svg" width="300" />
            </NuxtLink>
        </div>
        <div class="flex-1 flex justify-center items-center bg-primary-50 h-full">
            <div class="bg-white rounded-xl py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Welcome back</h2>

                    <form @submit.prevent="onSubmit" class="mx-auto max-w-lg rounded-lg">
                        <div class="flex flex-col gap-4 p-4 md:p-8">
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
                                >Log in</Button
                            >

                            <div class="relative flex items-center justify-center">
                                <span class="absolute inset-x-0 h-px bg-gray-300"></span>
                                <span class="relative bg-white px-4 text-sm text-gray-400">Or log in with social</span>
                            </div>

                            <Button disabled outlined>
                                <div class="flex gap-2 text-black py-1 font-bold">
                                    <svg
                                        class="h-5 w-5 shrink-0"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                                            fill="#EA4335"
                                        />
                                    </svg>

                                    Continue with Google
                                </div>
                            </Button>

                            <div class="flex items-center justify-center p-4">
                                <p class="text-center text-sm text-gray-500">
                                    Don't have an account yet?
                                    <NuxtLink
                                        to="/auth/signup"
                                        class="text-primary-500 transition duration-100 hover:text-primary-600 active:text-primary-700"
                                    >
                                        Sign Up
                                    </NuxtLink>
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
