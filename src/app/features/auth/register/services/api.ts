import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse, CheckEmail, SendOTP } from '@/types/common';

export async function checkEmailExists(
  email: string,
): Promise<ApiResponse<CheckEmail>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CHECK_EMAIL, {
      email,
    });

    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error checking email:', err.message);
    return {
      success: false,
      code: 500,
      message: err.message,
      data: null,
    };
  }
}

export async function sendOtpCode(
  email: string,
): Promise<ApiResponse<SendOTP>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SEND_OTP, {
      email,
    });

    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error checking email:', err.message);
    return {
      success: false,
      code: 500,
      message: err.message,
      data: null,
    };
  }
}
