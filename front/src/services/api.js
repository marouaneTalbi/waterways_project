import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8888/api',
    timeout: 5000, // temps d'attente
});

const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('jwtToken', token);
    } else {
        delete instance.defaults.headers.common['Authorization'];
        localStorage.removeItem('jwtToken');
    }

};

const checkAuthToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        setAuthToken(token);
    }
};

export const apiCall = async (method, url, data = null, headers = {}) => {
    checkAuthToken();

    try {
        const response = await instance({
            method,
            url,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
