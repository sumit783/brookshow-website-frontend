import axios from 'axios';
import { toast } from "sonner";

export const API_BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URI || 'http://localhost:5000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "gLzOQGmoJk4b92oJcisx3y4KMFcecp";

const client = axios.create({
  baseURL: API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

let isRedirecting = false;

// Auth endpoints that return 401 for incorrect credentials/OTP, not expired session
const AUTH_ENDPOINTS = [
  '/api/auth/register',
  '/api/auth/verify-registration-otp',
  '/api/auth/request-otp',
  '/api/auth/verify-email-otp',
  '/api/auth/login',
];

/**
 * Clears user session from storage, dispatches auth events, and optionally redirects to login.
 */
export const logoutUser = (options?: { redirectToLogin?: boolean; message?: string }) => {
  if (typeof window === 'undefined') return;

  const { redirectToLogin = true, message } = options || {};

  // Clear local storage auth items
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Notify any active components (Navbar, etc.)
  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new CustomEvent("auth-logout"));

  if (redirectToLogin) {
    const isAuthPage =
      window.location.pathname === '/signin' ||
      window.location.pathname === '/login' ||
      window.location.pathname === '/signup';

    if (message) {
      try {
        sessionStorage.setItem("auth_redirect_reason", message);
      } catch (e) {
        // ignore
      }
      toast.error(message);
    }

    if (!isAuthPage && !isRedirecting) {
      isRedirecting = true;
      const currentPath = window.location.pathname + window.location.search;
      const redirectUrl = `/signin?redirectTo=${encodeURIComponent(currentPath)}`;
      window.location.href = redirectUrl;
    }
  }
};

client.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error?.response?.status ?? error?.status;

    if (status === 401) {
      const requestUrl = error?.config?.url || '';
      const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => requestUrl.includes(endpoint));

      // Only handle session expiration if this is not a signin/signup/OTP submission attempt
      if (!isAuthEndpoint) {
        logoutUser({
          redirectToLogin: true,
          message: "Session expired. Please sign in again.",
        });
      }
    }
    return Promise.reject(error);
  }
);

export default client;
