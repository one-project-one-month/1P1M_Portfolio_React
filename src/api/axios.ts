import { API_CONFIG } from '@/config/api';
import { logout } from '@/lib/utils';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (err: any) => void;
}

const apiClient = axios.create({
  baseURL: API_CONFIG.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;

    if (status !== 401 && status !== 400) {
      return Promise.reject(error);
    }

    const isRefreshEndpoint = originalRequest.url?.includes(
      '/auth/users/refresh',
    );
    if (isRefreshEndpoint) {
      logout();
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => apiClient(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await apiClient.post(
        '/portfolio/api/v1/auth/users/refresh',
        {},
        { withCredentials: true },
      );

      processQueue(null);

      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
