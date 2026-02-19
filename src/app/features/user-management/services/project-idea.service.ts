import apiClient from '@/api/axios';
import type {
  EditIdeaType,
  IdeaDeleteResponseType,
  IdeaEditResponseType,
  IdeaStatusUpdateResponseType,
} from '@/app/features/user-management/types/project-idea-type';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';

export const getProjectIdeaDetail = async (id: number) => {
  try {
    const response = await apiClient.get<IdeaEditResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}/${id}`,
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

export const editProjectIdeaService = async (
  projectIdeaId: number,
  formData: EditIdeaType,
) => {
  try {
    const response = await apiClient.patch<IdeaEditResponseType>(
      `${API_ENDPOINTS.UPDATE_PROJECT_IDEA}/${projectIdeaId}`,
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

export const deleteProjectIdeaService = async (ideaId: number) => {
  try {
    const response = await apiClient.delete<IdeaDeleteResponseType>(
      `${API_ENDPOINTS.DELETE_PROJECT_IDEA}/${ideaId}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error delete project idea:', e);
    throw e;
  }
};

export const ideaStatusChangeService = async (
  projectIdeaId: number,
  status: number,
) => {
  try {
    const response = await apiClient.patch<IdeaStatusUpdateResponseType>(
      `/portfolio/api/v1/project-idea?projectIdeaId=${projectIdeaId}&status=${status}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error idea status change error:', e);
    throw e;
  }
};
