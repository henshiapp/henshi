<script setup lang="ts">
import { queryOptions, useMutation } from '@tanstack/vue-query';
import { api } from '../../../../api/api.ts';
import { PaginatedResponse, PaginationDto, User, UserRole } from '@henshi/types';
import HDataTable from '../../../../components/HDataTable/index.vue';
import SaveUserForm from './components/SaveUserForm.vue';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { Ref } from 'vue';
import { format } from 'date-fns';

const getUsersQueryOptions = (query: Ref<PaginationDto>) => {
    return queryOptions({
        queryKey: ['users', query],
        queryFn: () =>
            api.get<PaginatedResponse<User>>('/users', {
                params: query.value,
            }),
        select: (res) => res.data,
    });
};

const deleteUserMutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: (id: string) => api.delete('/users/' + id),
});

const bulkDeleteUsersMutation = useMutation({
    mutationKey: ['deleteUsers'],
    mutationFn: (ids: string[]) =>
        api.delete('/users/bulk', {
            params: {
                id: ids,
            },
        }),
});

const getRoleLabel = (role: number) => {
    switch (role) {
        case UserRole.ADMIN:
            return 'Admin';
        case UserRole.FREE_USER:
            return 'Free user';
    }
};

const getRoleSeverity = (role: number) => {
    switch (role) {
        case UserRole.ADMIN:
            return 'danger';
        case UserRole.FREE_USER:
            return 'success';
    }
};

const formatDate = (date: string) => {
    return format(date, 'MM/dd/yyyy hh:mm');
};
</script>

<template>
    <p class="font-bold text-3xl mb-4">Users</p>

    <HDataTable
        :get-query-options="getUsersQueryOptions"
        :create-entity-component="SaveUserForm"
        :edit-entity-component="SaveUserForm"
        :delete-entity-mutation="deleteUserMutation"
        :bulk-delete-entities-mutation="bulkDeleteUsersMutation"
    >
        <template #columns>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Name" :sortable="true" style="min-width: 16rem"></Column>
            <Column field="email" header="Email" :sortable="true" style="min-width: 16rem"></Column>
            <Column field="role" header="Role" :sortable="true" style="min-width: 12rem">
                <template #body="slotProps">
                    <Tag :value="getRoleLabel(slotProps.data.role)" :severity="getRoleSeverity(slotProps.data.role)" />
                </template>
            </Column>
            <Column field="emailConfirmed" header="Confirmed email" :sortable="true" style="min-width: 12rem">
                <template #body="slotProps">
                    <i
                        v-if="slotProps.data.emailConfirmed"
                        class="ti ti-check text-green-300 bg-green-500/20 p-1 rounded-full"
                    ></i>
                    <i v-else class="ti ti-x text-red-300 bg-red-500/20 p-1 rounded-full"></i>
                </template>
            </Column>
            <Column field="createdAt" header="Created at" :sortable="true" style="min-width: 12rem">
                <template #body="slotProps"> {{ formatDate(slotProps.data.createdAt) }} </template>
            </Column>
            <Column field="updatedAt" header="Updated at" :sortable="true" style="min-width: 12rem">
                <template #body="slotProps"> {{ formatDate(slotProps.data.updatedAt) }} </template>
            </Column>
        </template>
    </HDataTable>
</template>

<style scoped></style>
