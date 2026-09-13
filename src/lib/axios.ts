// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.100.215:8000/api';

// export const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Attach access token to outgoing requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


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