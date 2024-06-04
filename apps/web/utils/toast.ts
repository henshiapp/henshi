import { getErrorMessage } from '~/api/utils/get-error-message';
import type { ToastServiceMethods } from 'primevue/toastservice';
import { FetchError } from 'ofetch';

export const successToast = (toast: ToastServiceMethods, message: string) => {
    return toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
};

export const errorToast = (toast: ToastServiceMethods, error: globalThis.Ref<FetchError<any> | null>) => {
    return toast.add({ severity: 'error', summary: 'Error', detail: getErrorMessage(error.value), life: 3000 });
};
