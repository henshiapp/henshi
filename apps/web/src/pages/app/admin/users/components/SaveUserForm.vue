<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { errorToast, successToast } from '../../../../../utils/toast.ts';
import { useToast } from 'primevue/usetoast';
import { useMutation, UseQueryReturnType } from '@tanstack/vue-query';
import { PaginatedResponse, User, UserRole } from '@henshi/types';
import { api } from '../../../../../api/api.ts';
import HInputText from '../../../../../components/HInputText/index.vue';
import Button from 'primevue/button';
import HDropdown from '../../../../../components/HDropdown/index.vue';
import HInputPassword from '../../../../../components/HInputPassword/index.vue';
import { computed } from 'vue';
import { fromEnumToDropdownValues } from '../../../../../utils/enums.ts';
import { AxiosError } from 'axios';

const { entity, hideDialog, entityQuery } = defineProps<{
    entity?: User;
    hideDialog: Function;
    entityQuery: UseQueryReturnType<PaginatedResponse<User>, Error>;
}>();

const isEditMode = !!entity;

const toast = useToast();

const createMutation = useMutation({
    mutationKey: ['createUser'],
    mutationFn: (data: Partial<User>) => api.post('/users/', data).then((res) => res.data),
});

const editMutation = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
        api.patch('/users/' + id, data).then((res) => res.data),
});

const schema = !isEditMode
    ? Yup.object({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().required(),
          role: Yup.object().required(),
      })
    : Yup.object({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
          role: Yup.object().required(),
      });

const form = useForm<any>({
    validationSchema: schema,
});

const name = useField('name');
const email = useField('email');
const password = useField('password');
const role = useField('role');

const roles = fromEnumToDropdownValues(UserRole);

if (isEditMode) {
    form.setValues({
        name: entity.name,
        email: entity.email,
        role: roles.find((r) => r.value === entity.role),
    });
}

const submit = form.handleSubmit(async (data: any) => {
    try {
        if (isEditMode) {
            await editMutation.mutateAsync({ id: entity.id, data: { ...data, role: data.role.value } });
            successToast(toast, 'User updated successfully');
        } else {
            await createMutation.mutateAsync({ ...data, role: data.role.value });
            successToast(toast, 'User created successfully');
        }

        await entityQuery.refetch();
        hideDialog();
    } catch (e) {
        if (e instanceof AxiosError) errorToast(toast, e);
    }
});

const formIsInvalid = computed(() => !form.meta.value.valid);
const mutationIsExecuting = computed(() =>
    isEditMode ? editMutation.isPending.value : createMutation.isPending.value,
);
const disableSaveButton = computed(() => formIsInvalid.value || mutationIsExecuting.value);
</script>

<template>
    <form @submit.prevent="submit">
        <div class="flex flex-col gap-2 mb-8">
            <HInputText label="Name" v-model="name.value.value" :errorMessage="name.errorMessage.value" />
            <HInputText label="Email" v-model="email.value.value" :errorMessage="email.errorMessage.value" />
            <HInputPassword
                v-if="!entity"
                label="Password"
                v-model="password.value.value"
                :errorMessage="password.errorMessage.value"
            />
            <HDropdown
                label="Role"
                :options="roles"
                v-model="role.value.value"
                :errorMessage="role.errorMessage.value"
            ></HDropdown>
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="hideDialog()" />
            <Button
                type="button"
                label="Save"
                @click="submit"
                :disabled="disableSaveButton"
                :loading="mutationIsExecuting"
            />
        </div>
    </form>
</template>
