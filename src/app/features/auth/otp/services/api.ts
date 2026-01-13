import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/common';

export async function signupWithEmail(
  email: string,
  password: string,
): Promise<ApiResponse<null>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, {
      email,
      password,
    });

    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error signup:', err.message);
    return {
      success: false,
      code: 500,
      message: err.message,
      data: null,
    };
  }
}
