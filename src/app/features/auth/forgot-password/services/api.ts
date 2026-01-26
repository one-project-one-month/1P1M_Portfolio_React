import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/common';
import type { ForgotPasswordData } from './types';

export async function forgotPassword(
  email: string,
): Promise<ApiResponse<ForgotPasswordData>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });

    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error in forgot password:', err);
    return {
      success: false,
      code: 500,
      message: err.message,
      data: undefined,
    };
  }
}
