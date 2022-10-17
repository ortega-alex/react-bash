import axios from 'axios';
import { getStorage, _KEYS } from '@/services';

export const PublicPrivateInterceptor = () => {
    axios.interceptors.request.use(request => {
        const token = getStorage(_KEYS.TOKEN);
        if (token) request.headers.Token = token;
        if (process.env.NODE_ENV === 'development') request.headers.Encoding = _KEYS.ENCODING;
        return request;
    });

    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    );
};

export default PublicPrivateInterceptor;
