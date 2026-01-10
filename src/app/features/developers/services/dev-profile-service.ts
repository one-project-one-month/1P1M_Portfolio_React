import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { GetDevProfiles, GetDevProfilesParams } from '@/types/dev';
import { AxiosError } from 'axios';

export const getDevProfiles = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetDevProfilesParams) => {
  try {
    const response = await apiClient.get<GetDevProfiles>(
      API_ENDPOINTS.GET_PROFILE,
      {
        params: { keyword, page, size, sortField, sortDirection },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching dev profiles:', e);
    throw {
      success: false,
      message: 'Failed to fetch approved projects',
    };
  }
};
