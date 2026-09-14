


import axios from 'axios';

export const api = axios.create({
  baseURL:'http://192.168.100.215:8000/api', // or your BASE_URL variable
});

// Add the interceptor here
api.interceptors.request.use((config) => {
  const isPublicEndpoint =
    config.url?.includes('/register') ||
    config.url?.includes('/login');

  const token = localStorage.getItem('token');

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;