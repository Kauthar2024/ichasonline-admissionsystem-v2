import axios from 'axios';
import { getAccessToken } from './session';

// Changed fallback to include /api at the end
const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/'; 

export const api = axios.create({
  baseURL: BASE_URL,
});

// Add the interceptor here
api.interceptors.request.use((config) => {
  const isPublicEndpoint =
    config.url?.includes('/register') ||
    config.url?.includes('/login');

  const token = getAccessToken();

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
