<script setup lang="ts">
import { ref, type Component, computed, Ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import IconField from 'primevue/iconfield';
import Dialog from 'primevue/dialog';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import DataTable, { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable';
import { MenuItem } from 'primevue/menuitem';
import { useConfirm } from 'primevue/useconfirm';
import { errorToast, successToast } from '../../utils/toast.ts';
import { UseMutationReturnType, useQuery } from '@tanstack/vue-query';
import { PaginatedResponse, PaginationDto, PaginationMeta } from '@henshi/types';
import { BaseEntity } from '@henshi/abstract';
import { AxiosError } from 'axios';

const { getQueryOptions, deleteEntityMutation, bulkDeleteEntitiesMutation } = defineProps<{
    getQueryOptions: (query: Ref<PaginationDto>) => any;
    createEntityComponent: Component;
    editEntityComponent: Component;
    deleteEntityMutation: UseMutationReturnType<any, any, any, any>;
    bulkDeleteEntitiesMutation: UseMutationReturnType<any, any, any, any>;
}>();

const search = ref('');
const toast = useToast();
const dt = ref();
const entity = ref<BaseEntity | undefined>();
const entities = computed<BaseEntity[]>(() => query.data.value?.data || []);
const meta = computed<PaginationMeta | undefined>(() => query.data.value?.meta);
const createEntityDialog = ref(false);
const editEntityDialog = ref(false);
const selectedEntities = ref<BaseEntity[]>([]);
const lazyParams = ref<PaginationDto>({
    page: '1',
    fields: [],
    relations: [],
    itemsPerPage: '10',
    sort: 'createdAt',
    order: 'desc',
});
const menu = ref();
const items = ref<MenuItem[]>([
    {
        label: 'Options',
        items: [
            {
                label: 'Edit',
                icon: 'ti ti-edit',
                command: () => showEditEntityDialog(),
            },
            {
                label: 'Delete',
                icon: 'ti ti-trash',
                command: () => showDeleteEntityDialog(),
            },
        ],
    },
]);

const query = useQuery<PaginatedResponse<BaseEntity>>(getQueryOptions(lazyParams));
const confirm = useConfirm();

const deleteConfirmationOptions = {
    header: 'Confirmation',
    icon: 'ti ti-alert-triangle mr-2',
    rejectClass:
        'bg-transparent border-surface-600 hover:bg-surface-800 hover:border-surface-600 focus:ring-surface-600',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    acceptClass: 'bg-red-500 hover:bg-red-800 border-red-600 hover:border-red-600 focus:ring-red-600',
};

const showCreateEntityDialog = () => (createEntityDialog.value = true);
const hideCreateEntityDialog = () => (createEntityDialog.value = false);
const showEditEntityDialog = () => (editEntityDialog.value = true);
const hideEditEntityDialog = () => (editEntityDialog.value = false);
const showDeleteEntityDialog = () => {
    confirm.require({
        ...deleteConfirmationOptions,
        message: 'Are you sure you want to delete?',
        accept: async () => {
            try {
                await deleteEntityMutation.mutateAsync(entity.value?.id);
                await query.refetch();
                successToast(toast, 'Successfully deleted');
            } catch (e) {
                if (e instanceof AxiosError) errorToast(toast, e);
            }
        },
    });
};
const showBulkDeleteEntitiesDialog = () => {
    confirm.require({
        ...deleteConfirmationOptions,
        message: 'Are you sure you want to delete all?',
        accept: async () => {
            try {
                const ids = selectedEntities.value.map((entity) => entity.id);
                await bulkDeleteEntitiesMutation.mutateAsync(ids);
                await query.refetch();
                successToast(toast, 'Successfully deleted');
            } catch (e) {
                if (e instanceof AxiosError) errorToast(toast, e);
            }
        },
    });
};

const onActionsClick = (event: MouseEvent, data: BaseEntity) => {
    menu.value.toggle(event);
    entity.value = data;
};

const onSearch = () => {
    lazyParams.value = { ...lazyParams.value, search: search.value };
};

const onPage = async (event: DataTablePageEvent) => {
    lazyParams.value = { ...lazyParams.value, page: String(event.page + 1) };
};

const onSort = async (event: DataTableSortEvent) => {
    lazyParams.value = {
        ...lazyParams.value,
        sort: String(event.sortField),
        order: event.sortOrder === 1 ? 'asc' : 'desc',
    };
};
</script>

<template>
    <Toast />
    <ConfirmDialog />

    <DataTable
        ref="dt"
        dataKey="id"
        lazy
        paginator
        @page="onPage($event)"
        @sort="onSort($event)"
        v-model:selection="selectedEntities"
        :value="entities"
        :loading="query.isPending.value"
        :rows="meta?.itemsPerPage"
        :total-records="meta?.itemsCount"
        :rowsPerPageOptions="[5, 10, 25]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
    >
        <template #header>
            <div class="flex justify-between">
                <IconField
                    iconPosition="left"
                    :pt="{
                        root: 'relative [&>input]:w-full [&>*:first-child]:absolute [&>*:first-child]:top-1/2 [&>*:first-child]:-mt-3 [&>*:first-child]:leading-none [&>*:first-child]:text-surface-900/60 dark:[&>*:first-child]:text-white/60 [&>*:first-child]:left-3 [&>*:last-child]:pl-10',
                    }"
                >
                    <InputIcon>
                        <i class="ti ti-search" />
                    </InputIcon>
                    <InputText v-model="search" @change="onSearch" placeholder="Search..." />
                </IconField>
                <div>
                    <Button
                        class="mr-2"
                        icon="ti ti-trash"
                        severity="danger"
                        label="Delete"
                        :disabled="!selectedEntities.length"
                        @click="showBulkDeleteEntitiesDialog"
                    ></Button>
                    <Button icon="ti ti-plus" severity="success" label="New" @click="showCreateEntityDialog"></Button>
                </div>
            </div>
        </template>

        <slot name="columns"></slot>

        <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
                <Button
                    type="button"
                    severity="secondary"
                    icon="ti ti-dots-vertical"
                    @click="onActionsClick($event, slotProps.data)"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                />
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="createEntityDialog" modal header="Create" :style="{ width: '25rem' }">
        <component :is="createEntityComponent" :hide-dialog="hideCreateEntityDialog" :entity-query="query" />
    </Dialog>

    <Dialog v-model:visible="editEntityDialog" modal header="Edit" :style="{ width: '25rem' }">
        <component
            :is="editEntityComponent"
            :hide-dialog="hideEditEntityDialog"
            :entity-query="query"
            :entity="entity"
        />
    </Dialog>
</template>

<style scoped></style>
