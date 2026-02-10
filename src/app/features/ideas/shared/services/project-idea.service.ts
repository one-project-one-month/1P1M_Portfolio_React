import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';
import type {
  CreateIdeaType,
  EditIdeaType,
  GetIdeaParamsType,
  IdeaCreateResponseType,
  IdeaDeleteResponseType,
  IdeaEditResponseType,
  IdeasResponseType,
  IdeaStatusType,
  IdeaStatusUpdateResponseType,
} from '../types/project-idea.types';

// GET
export const getProjectIdea = async ({
  keyword,
  page,
  size,
  status,
  sortOrder,
}: GetIdeaParamsType) => {
  try {
    const response = await apiClient.get<IdeasResponseType>(
      API_ENDPOINTS.GET_PROJECT_IDEAS,
      {
        params: { keyword, page, size, status, sortOrder },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching ideas:', e);
    throw {
      success: false,
      message: 'Failed to fetch ideas',
    };
  }
};

// CREATE
export const createProjectIdea = async (formData: CreateIdeaType) => {
  try {
    const response = await apiClient.post<IdeaCreateResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}`,
      formData,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error creating project idea:', e);
    throw {
      success: false,
      message: 'Failed to create project idea',
    };
  }
};

// Edit
export const editProjectIdea = async (id: number, formData: EditIdeaType) => {
  try {
    const response = await apiClient.patch<IdeaEditResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}/updateProjectIdea`,
      formData,
      { params: { projectIdeaId: id } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error editing project ideas:', e);
    throw {
      success: false,
      message: 'Failed to editing project ideas',
    };
  }
};

// Update
export const updateProjectIdeaStatus = async (
  id: number,
  formData: IdeaStatusType,
) => {
  try {
    const response = await apiClient.patch<IdeaStatusUpdateResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}/updateProjectIdea`,
      formData,
      { params: { projectIdeaId: id } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error updating project ideas status:', e);
    throw {
      success: false,
      message: 'Failed to update project ideas status',
    };
  }
};

// DELETE
export const deleteProjectIdea = async (id: number) => {
  try {
    const response = await apiClient.delete<IdeaDeleteResponseType>(
      API_ENDPOINTS.PROJECT_IDEA,
      { params: { projectIdeaId: id } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error deleting project ideas:', e);
    throw {
      success: false,
      message: 'Failed to delete project ideas',
    };
  }
};
