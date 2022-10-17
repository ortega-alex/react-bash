import axios from 'axios';

import { encryptData, decryptData } from '@/utilities/encryption.utility';
import { _SERVER } from './credemtials.service';

export const _GET = async path => {
    try {
        const res = await axios.get(_SERVER.apiUrl + path);
        return process.env.NODE_ENV === 'development' ? res.data : decryptData(res.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _POST = async (path, payload = {}, files = []) => {
    try {
        const data = new FormData();
        if (process.env.NODE_ENV === 'development') {
            Object.keys(payload).forEach(key => data.append(key, payload[key]));
        } else {
            data.append('data', encryptData(payload));
        }
        if (Array.isArray(files)) {
            files.forEach((file, index) => data.append(`file${index}`, file));
        } else {
            data.append('file', files);
        }
        const res = await axios.post(_SERVER.apiUrl + path, data);
        return process.env.NODE_ENV === 'development' ? res.data : decryptData(res.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _GET_BLOB = async path => {
    try {
        const res = await axios.get(_SERVER.apiUrl + path, { responseType: 'blob' });
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _GET_SIGNAL = path => {
    const controller = new AbortController();
    return { call: axios.get(_SERVER.apiUrl + path, { signal: controller.signal }), controller };
};
