import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/common';
import type { ResetPasswordData } from './types';

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<ApiResponse<ResetPasswordData>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
      email,
      newPassword,
    });
    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error resetting password:', err);
    return {
      success: false,
      code: 500,
      message: err.message,
      data: null,
    };
  }
}
