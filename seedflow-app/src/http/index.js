import axios from 'axios';

export const API_URL = 'http://localhost:4000';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use(config => {
    let token = localStorage.getItem('application_seedflow') || '{}';
    try {
        token = JSON.parse(token) || {};
        config.headers.Authorization = `Bearer ${token?.auth?.token || ''}`;
    } catch {
        config.headers.Authorization = ``;
    }
    return config;
});

$api.interceptors.response.use(config => {
    return config;
}, async (error) => {
    if (error.response.status === 401) {
        alert('Error');
    }
    return error.response;
});

export default $api;
