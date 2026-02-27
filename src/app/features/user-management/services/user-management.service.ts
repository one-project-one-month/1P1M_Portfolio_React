import apiClient from '@/api/axios';
import {
  type EditUserManagementType,
  type GetUserManagementParamsType,
  type UserBanResponseType,
  type UserManagementDetailResponseType,
  type UserManagementEditResponseType,
  type UserManagementResponseType,
  type UserProfileDetailResponseType,
  type UserRestoreResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';

export const getUserManagementService = async ({
  keyword,
  page,
  size,
  isBan,
}: GetUserManagementParamsType) => {
  try {
    const params: any = {
      keyword,
      page,
      size,
    };

    if (typeof isBan === 'boolean') {
      params.isBan = isBan;
    }

    const response = await apiClient.get<UserManagementResponseType>(
      API_ENDPOINTS.GET_ALL_USER_MANAGEMENT,
      { params },
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError<{ message?: string }>;
    throw new Error(e.response?.data?.message || e.message);
  }
};

// EDIT
export const editUserManagementService = async (
  userId: number,
  formData: EditUserManagementType,
) => {
  try {
    const response = await apiClient.patch<UserManagementEditResponseType>(
      `${API_ENDPOINTS.UPDATE_USER_MANAGEMENT}/${userId}`,
      formData,
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

export const getUserManagementDetail = async (userId: number) => {
  try {
    const response = await apiClient.get<UserManagementDetailResponseType>(
      `${API_ENDPOINTS.GET_USER_MANAGEMENT_DETAIL}/${userId}`,
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error detail user:', e);
    throw {
      success: false,
      message: 'Failed to load detail user',
    };
  }
};

export const getUserProfileDetail = async (userId: number) => {
  try {
    const response = await apiClient.get<UserProfileDetailResponseType>(
      `${API_ENDPOINTS.GET_PROFILE_DATA}?userId=${userId}`,
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error detail user:', e);
    throw {
      success: false,
      message: 'Failed to load detail user',
    };
  }
};

// DELETE
export const banUserService = async (userId: number, desc: string) => {
  try {
    const response = await apiClient.patch<UserBanResponseType>(
      `${API_ENDPOINTS.BAN_USER}/${userId}?desc=${encodeURIComponent(desc)}`,
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error banning user:', e);
    throw e;
  }
};

export const restoreUserService = async (userId: number) => {
  try {
    const response = await apiClient.patch<UserRestoreResponseType>(
      `${API_ENDPOINTS.UPLOAD_DEV_IMAGE}/${userId}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error banning user:', e);
    throw e;
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
    console.error('Error uploading image:', e);
    throw e;
  }
};

export const shareProfile = async (userId: number) => {
  try {
    const response = await apiClient.patch<UserRestoreResponseType>(
      `${API_ENDPOINTS.UPLOAD_DEV_IMAGE}/${userId}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error share profile:', e);
    throw e;
  }
};
