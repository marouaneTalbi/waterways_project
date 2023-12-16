
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = 'http://localhost:8888';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/merge-patch+json'
  },
});

export function getUserRole() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken;
}

export const currentUser = getUserRole();
export const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');
export const isAdmin = currentUser.roles.find(role => role === 'ROLE_PROVIDER');

const sendRequest = async (endpoint, method = 'GET', data = {}, requireAuth = true, params = {}) => {
  if (requireAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      data,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error with the request:', error.response?.data || error.message);
    throw error;
  }
};



axiosInstance.interceptors.request.use(async config => {

    if (config.url.includes('/auth')
        || config.url.includes('/api/token/refresh')
        || (config.url.includes('/api/users') && config.method === 'post')
        || (config.url.includes('/api/mdpresetemail') && config.method === 'post')
        || (config.url.includes('/api/resetmdp') && config.method === 'post')
    ) {
      return config;
    }

    const token = localStorage.getItem('token');
    const isValidToken = !isTokenExpired(token);

    if (!isValidToken) {
      const newToken = await refreshToken();
      config.headers['Authorization'] = `Bearer ${newToken}`;
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }, error => {
    return Promise.reject(error);
  });

function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const expirationDate = new Date(decodedToken.exp * 1000);
  const now = new Date();
  return now > expirationDate;
}

async function refreshToken() {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await sendRequest('/api/token/refresh ','post', { refresh_token });
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (error) {
    console.log(error)
  }
}

export default sendRequest;
