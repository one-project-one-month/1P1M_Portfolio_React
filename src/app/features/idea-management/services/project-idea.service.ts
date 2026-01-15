import apiClient from '@/api/axios';
import type {
  GetProjectIdeaParams,
  GetProjectIdeas,
} from '@/app/features/idea-management/types/idea-management.types';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';

export const getProjectIdeas = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetProjectIdeaParams) => {
  try {
    const response = await apiClient.get<GetProjectIdeas>(
      API_ENDPOINTS.GET_PROJECT_IDEAS,
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
