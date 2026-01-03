import axios from 'axios';

export const API_BASE_URI = import.meta.env.VITE_API_BASE_URI || 'http://localhost:5000';
const API_KEY = import.meta.env.VITE_API_KEY || "gLzOQGmoJk4b92oJcisx3y4KMFcecp";

const client = axios.create({
  baseURL: API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Clean up user data if exists
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default client;
