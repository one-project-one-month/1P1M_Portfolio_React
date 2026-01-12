import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from './response';
import type { LoginData } from './types';

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<ApiResponse<LoginData>> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    const data = response.data?.data;

    if (!data?.token) throw new Error('Invalid response: no token found');

    // store token & user data
    localStorage.setItem('token', data.token);

    const userInfo = {
      id: data.userId,
      username: data.username,
      email: data.email,
      role: data.role,
      roleId: data.roleId,
      isNewUserLogin: data.isNewUserLogin,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));

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
