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
  id: number,
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
      data: null,
    };
  }
}

export async function setupDevProfile(
  data: ProfileForm,
  id: number | undefined | null,
) {
  try {
    const payload = {
      ...data,
    };

    const response = await apiClient.post(
      `/portfolio/api/v1/profiles/create/` + `${id}`,
      payload,
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
  id: number,
  file: File,
): Promise<ApiResponse<null>> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.patch(
      `${API_ENDPOINTS.UPLOAD_DEV_IMAGE}?devProfileId=${id}`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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
      data: null,
    };
  }
}
