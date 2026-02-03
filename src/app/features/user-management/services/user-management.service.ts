import apiClient from '@/api/axios';
import type {
  EditUserManagementType,
  GetUserManagementParamsType,
  UserBanResponseType,
  UserManagementEditResponseType,
  UserManagementResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';

export const getUserManagementService = async ({
  keyword,
  page,
  size,
  status,
  sortDirection,
}: GetUserManagementParamsType) => {
  try {
    const response = await apiClient.get<UserManagementResponseType>(
      API_ENDPOINTS.GET_ALL_OPOM_REGISTER,
      {
        params: { keyword, page, size, status, sortDirection },
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
  id: number,
  formData: EditUserManagementType,
) => {
  try {
    const response = await apiClient.patch<UserManagementEditResponseType>(
      `${API_ENDPOINTS.USER_MANAGEMENT}/${id}`,
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

// DELETE
export const banUserService = async (id: number) => {
  try {
    const response = await apiClient.patch<UserBanResponseType>(
      `${API_ENDPOINTS.BAN_USER}/${id}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error banning user:', e);
    throw {
      success: false,
      message: 'Failed to ban user',
    };
  }
};
