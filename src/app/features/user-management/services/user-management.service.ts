import apiClient from '@/api/axios';
import {
  type EditUserManagementType,
  type GetUserManagementParamsType,
  type UserManagementResponseType,
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
      API_ENDPOINTS.GET_ALL_USER_MANAGEMENT,
      {
        params: { keyword, page, size, sortField, sortDirection },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching all users:', e);
    throw {
      success: false,
      message: 'Failed to fetch all users',
    };
  }
};

export const getUserManagementDetailById = async (id: number) => {
  try {
    const url = API_ENDPOINTS.GET_USER_MANAGEMENT_BY_ID.replace(
      '{id}',
      id.toString(),
    );
    // const response = await apiClient.get<UserManagementResponseType>(
    //   `${API_ENDPOINTS.GET_USER_MANAGEMENT_BY_ID}/${id}`,
    // );
    const response = await apiClient.get<UserManagementResponseType>(url);
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching user details:', e);

    throw {
      success: false,
      message: 'Failed to fetch user details',
    };
  }
};

export const editUserManagement = async (
  id: number,
  payload: EditUserManagementType,
) => {
  try {
    const url = API_ENDPOINTS.GET_USER_MANAGEMENT_BY_ID.replace(
      '{id}',
      id.toString(),
    );
    // const response = await apiClient.patch<EditUserManagementType>(
    //   `${API_ENDPOINTS.UPDATE_USER_MANAGEMENT_BY_ID}/${id}`,
    //   payload,
    // );

    const response = await apiClient.patch<EditUserManagementType>(
      url,
      payload,
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error editing user management:', e);
    throw {
      success: false,
      message: 'Faled to editign user management',
    };
  }
};

export const deleteUserManagement = async (id: number) => {
  try {
    const response = await apiClient.delete<UserManagementResponseType>(
      `${API_ENDPOINTS.DELETE_USER_MANAGEMENT_BY_ID}/${id}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error deleting user:', e);
    throw {
      success: false,
      message: 'Failed to delete user ',
    };
  }
};
