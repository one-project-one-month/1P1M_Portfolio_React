import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';
import type { UserProfileResponseType } from '../types/user-profile.type';

export const getUserProfileService = async ({ userId }: { userId: number }) => {
  try {
    const response = await apiClient.get<UserProfileResponseType>(
      API_ENDPOINTS.GET_PROFILE_DATA,
      { params: { userId } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching user profile:', e);
    throw {
      success: false,
      message: 'Failed to fetch user profile',
    };
  }
};
