// src/api/axios.js
import axios from 'axios';

const URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambah token di setiap request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const path = config.url || '';
  const isAuthPath = path.includes('/auth/login') || path.includes('/auth/register');

  if (!isAuthPath && !token) {
    window.location.href = '/auth/login';
    return Promise.reject(new Error('Unauthorized: No token'));
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

// Tangani error response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Token invalid atau expired
      localStorage.removeItem('token');
      window.location.href = '/auth/login'; // pakai native redirect
    }

    // Kalau errornya bukan 401, jangan logout
    return Promise.reject(error);
  }
);

export default axiosInstance;
