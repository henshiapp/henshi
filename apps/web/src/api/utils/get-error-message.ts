import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError<any>) => {
    let message = error.response?.data?.message;
    message = Array.isArray(message) ? message.join(', ') : message;
    return message || 'Por favor, tente novamente';
};
