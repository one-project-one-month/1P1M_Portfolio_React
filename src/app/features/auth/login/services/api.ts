import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { LoginResponse } from '@/types/auth';
import type { AxiosError } from 'axios';
import type { ApiResponse } from './response';

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.LOGIN,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (e: unknown) {
    const err = e as AxiosError;
    console.error('Error logging in:', err);

    if (err.response) {
      return {
        success: false,
        code: err.response.status,
        message: (err.response?.data as any)?.message || 'Error',
      };
    }

    if (err.request) {
      return {
        success: false,
        code: 0,
        message: 'Network error. Server not reachable.',
      };
    }

    return {
      success: false,
      code: 0,
      message: err.message || 'Unexpected error',
    };
  }
}
