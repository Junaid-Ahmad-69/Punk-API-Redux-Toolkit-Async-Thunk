import axios from 'axios';
import { clearSessionStorage, getSessionStorage } from "../../utils/helper.ts";
import {ToasterMessage} from "@/components/Toast";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getSessionStorage('user');

        if (!token && window.location.pathname !== '/login') {
            window.location.href = '/login';
            ToasterMessage({
                type: 'error',
                message: 'Session expired',
                description: 'Please login again',
                duration: 5000
            });
            return Promise.reject(new axios.Cancel('No token available'));
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            clearSessionStorage('token');
            if (window.location.pathname !== '/login') {
                ToasterMessage({
                    type: 'error',
                    message: 'Session expired',
                    description: 'Please login again',
                    duration: 5000
                });
                window.location.href = '/login';
            }
            return Promise.reject({
                message: 'Your session has expired. Please log in again.',
                isSessionExpired: true
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;