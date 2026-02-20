import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';
import type {
  EditUserProfileType,
  UserProfileEditResponseType,
  UserProfileResponseType,
} from '../types/user-profile.type';

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

export const editUserProfileService = async (
  id: number,
  formData: EditUserProfileType,
) => {
  try {
    const response = await apiClient.patch<UserProfileEditResponseType>(
      API_ENDPOINTS.GET_PROFILE,
      formData,
      { params: { id } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error editing user:', e);
    throw {
      success: false,
      message: 'Failed to edit user',
    };
  }
};

export const uploadDevImageService = async (
  devProfileId: number,
  file: File,
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.patch(
      `${API_ENDPOINTS.UPLOAD_DEV_IMAGE}?devProfileId=${devProfileId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error uploading profile image:', e);
    throw {
      success: false,
      message: 'Failed to upload profile image',
    };
  }
};
