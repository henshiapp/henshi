import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
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
