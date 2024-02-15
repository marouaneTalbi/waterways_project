
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Params } from 'react-router';
const API_BASE_URL = process.env.REAT_APP_API_BASE_URL



const axiosInstance = axios.create({
  baseURL: API_BASE_URL
}); 



const urlsWithoutAuth = ['/api/token/refresh', '/api/users', '/api/mdpresetemail', '/api/resetmdp', '/auth'];


export function getUserRole() {
  if(!localStorage.getItem('token')) {
    return null;
  } else {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
}

const sendRequest = async (endpoint, method = 'GET', data = {}, requireAuth = true, params = {}) => {
  const isValidToken = !isTokenExpired();

  if (requireAuth && isValidToken) {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    try {
      const response = await axiosInstance({
        url: endpoint,
        method,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error with the request:', error.response?.data || error.message);
      throw error;
    }
  } else {
    try {
      const response = await axiosInstance({
        url: endpoint,
        method,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error with the request:', error.response?.data || error.message);
      throw error;
    }
  }
}

 
axiosInstance.interceptors.request.use(async config => {

  const token = localStorage.getItem('token');
  const isValidToken = !isTokenExpired();

  if(!token && !urlsWithoutAuth.includes(config.url)) {
    window.location.replace('/login');
  }

  if (config.url.includes('/auth')
      || config.url.includes('/api/token/refresh')
      || (config.url.includes('/api/users') && config.method === 'post')
      || (config.url.includes('/api/mdpresetemail') && config.method === 'post')
      || (config.url.includes('/api/resetmdp') && config.method === 'post')
  ) {

    return config;
  }

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

export  function isTokenExpired() {
  if(!localStorage.getItem('token')) {
    return null;
  } else {
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const now = new Date();
    return now > expirationDate;
  }
}

async function refreshToken() {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await sendRequest('/api/token/refresh ','post', { refresh_token }, false);
    localStorage.setItem('token', response.token);
    if(response) {
      window.location.reload();
      return response.token;
    }
  } catch (error) {
    console.log(error)
  }
}
 
export async function checkIfRequestExists() {
  try {
    await sendRequest('/api/kbis/me');
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    return null;
  }
}

export default sendRequest;