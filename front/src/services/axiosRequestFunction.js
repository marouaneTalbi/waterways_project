
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sendRequest = async (endpoint, method = 'GET', data = {}, requireAuth = true) => {
  const token = requireAuth ? localStorage.getItem('jwtToken') : null;

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
    });
    return response.data;
  } catch (error) {
    console.error('Error with the request:', error.response?.data || error.message);
    throw error;
  }
};

export default sendRequest;
