import apiClient from '@/api/axios';
import {
  type EditUserManagementType,
  type GetUserManagementParamsType,
  type UserManagementDetailResponseType,
  type UserManagementEditResponseType,
  type UserManagementResponseType,
  type UserProfileDetailResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';

export const getUserManagementService = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetUserManagementParamsType) => {
  try {
    const response = await apiClient.get<UserManagementResponseType>(
      API_ENDPOINTS.GET_ALL_USER_MANAGEMENT,
      {
        params: { keyword, page, size, sortField, sortDirection },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching project ideas:', e);
    throw {
      success: false,
      message: 'Failed to fetch project ideas',
    };
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
    // const response = await apiClient.patch<UserBanResponseType>(
    //   `${API_ENDPOINTS.BAN_USER}/${userId}`,
    //   {},
    //   {
    //     params: { desc },
    //   },
    // );

    const response = await apiClient.patch(
      `${API_ENDPOINTS.BAN_USER}/${userId}?desc=${encodeURIComponent(desc)}`,
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error banning user:', e);
    throw e;
  }
};
