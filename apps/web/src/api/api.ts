import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

export const api = axios.create({
    baseURL: BASE_URL + '/api',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    // async (_error) => {
    //     // const originalRequest = error.config;
    //     // const errMessage = error.response.data.message as string;
    //     // if (errMessage.includes('not logged in') && !originalRequest._retry) {
    //     //     originalRequest._retry = true;
    //     //     await refreshAccessTokenFn();
    //     //     return api(originalRequest);
    //     // }
    //     // return Promise.reject(error);
    // },
);
