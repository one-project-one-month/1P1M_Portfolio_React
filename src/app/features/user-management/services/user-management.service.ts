import apiClient from '@/api/axios';
import type {
  GetUserManagementParamsType,
  UserManagementResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';

export const getUserManagement = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetUserManagementParamsType) => {
  try {
    const response = await apiClient.get<UserManagementResponseType>(
      API_ENDPOINTS.GET_ALL_OPOM_REGISTER,
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
