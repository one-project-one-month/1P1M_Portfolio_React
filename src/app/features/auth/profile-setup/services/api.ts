import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse, Profile, ProfileForm } from '@/types/common';

export async function getProfile(id: string): Promise<ApiResponse<Profile>> {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.GET_PROFILE_DATA}?userId=${id}`,
    );

    return response.data;
  } catch (e: unknown) {
    const err = e as Error;
    console.error('Error fetching profile data:', err);
    return {
      success: false,
      code: 500,
      message: err.message,
    };
  }
}

export async function updateProfile(
  id: string,
  data: object,
): Promise<ApiResponse<null>> {
  try {
    const response = await apiClient.patch(
      `${API_ENDPOINTS.UPDATE_PROFILE}?id=${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error('Error updating profile data:', error);
    return {
      success: false,
      code: 500,
      message: err.message,
    };
  }
}

export async function setupDevProfile(data: ProfileForm) {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') as string);

    console.log(API_ENDPOINTS.SETUP_PROFILE + `${user.id}`);

    if (!user || !token)
      throw new Error('Missing token. You are not logged in.');

    const payload = {
      ...data,
    };

    const response = await apiClient.post(
      API_ENDPOINTS.SETUP_PROFILE + `${user.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error('Error updating profile data:', error);
    return {
      success: false,
      code: 500,
      message: err.message,
    };
  }
}

export default async function uploadDevImage(
  id: string,
  file: File,
): Promise<ApiResponse<null>> {
  try {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.patch(
      `${API_ENDPOINTS.UPLOAD_DEV_IMAGE}?devProfileId=${id}`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(user?.token && { Authorization: `Bearer ${user.token}` }),
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error('Failed to upload image', err);
    return {
      success: false,
      code: 500,
      message: err.message,
    };
  }
}
