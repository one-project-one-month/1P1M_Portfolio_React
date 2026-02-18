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

export const deleteProjectIdeaService = async (projectIdeaId: number) => {
  try {
    const response = await apiClient.patch<IdeaDeleteResponseType>(
      `${API_ENDPOINTS.RESTORE_USER}/${projectIdeaId}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error banning user:', e);
    throw e;
  }
};

export const ideaStatusChangeService = async (projectIdeaId: number) => {
  try {
    const response = await apiClient.patch<IdeaStatusUpdateResponseType>(
      `${API_ENDPOINTS.RESTORE_USER}/${projectIdeaId}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error banning user:', e);
    throw e;
  }
};
