import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { LoginResponse } from '@/types/auth';
import type { ApiResponse } from './response';

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error logging in:', err);
    return {
      success: false,
      code: 500,
      message: err.message,
    };
  }
}
