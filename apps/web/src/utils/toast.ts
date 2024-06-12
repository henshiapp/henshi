import { getErrorMessage } from '../api/utils/get-error-message';
import type { ToastServiceMethods } from 'primevue/toastservice';
import { AxiosError } from 'axios';

export const successToast = (toast: ToastServiceMethods, message: string) => {
    return toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
};

export const errorToast = (toast: ToastServiceMethods, error: AxiosError<any>) => {
    return toast.add({ severity: 'error', summary: 'Error', detail: getErrorMessage(error), life: 3000 });
};
