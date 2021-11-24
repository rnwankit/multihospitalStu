import axios, {AxiosRequestConfig} from 'axios';
import { API_GATEWAY_URL } from '../shared/baseUrl';

// Axios configuration, interceptors and helpers
// https://axios-http.com/docs/instance
// https://axios-http.com/docs/req_config

export const axiosInstance = axios.create({
    baseURL: API_GATEWAY_URL,
    timeout: 60000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    }
});

export function sendRequest(config) {
    return axiosInstance.request(config);
}

export function sendGetJson(path) {
    return sendRequest({
        url: path,
        method: 'get'
    });
}

export function sendPostJson(path, data) {
    return sendRequest({
        url: path,
        method: 'post',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function sendDeleteJson(path) {
    return sendRequest({
        url: path,
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function sendPutJson(path, data) {
    return sendRequest({
        url: path,
        method: 'put',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
