import { FetchError } from 'ofetch';

export const getErrorMessage = (error: FetchError<any> | null) => {
    const message = Array.isArray(error?.data.message) ? error?.data.message.join(', ') : error?.data.message;
    return message || 'Por favor, tente novamente';
};
