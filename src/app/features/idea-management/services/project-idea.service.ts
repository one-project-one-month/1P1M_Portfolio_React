import apiClient from '@/api/axios';
import type {
  GetProjectIdeaParamsType,
  ProjectIdeasResponseType,
  ProjectIdeaUpdateResponseType,
  UpdateProjectIdeaType,
} from '@/app/features/idea-management/types/project-idea.types';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';

export const getProjectIdea = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetProjectIdeaParamsType) => {
  try {
    const response = await apiClient.get<ProjectIdeasResponseType>(
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

export const updateProjectIdea = async (
  id: number,
  formData: UpdateProjectIdeaType,
) => {
  try {
    const response = await apiClient.put<ProjectIdeaUpdateResponseType>(
      `${API_ENDPOINTS.GET_PROJECT_IDEAS}/${id}`,
      formData,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error updating project ideas:', e);
    throw {
      success: false,
      message: 'Failed to update project ideas',
    };
  }
};
