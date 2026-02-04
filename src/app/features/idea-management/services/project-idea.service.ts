import apiClient from '@/api/axios';
import type {
  CreateProjectIdeaType,
  EditProjectIdeaType,
  GetProjectIdeaParamsType,
  ProjectIdeaCreateResponseType,
  ProjectIdeaDeleteResponseType,
  ProjectIdeaEditResponseType,
  ProjectIdeaStatusUpdateResponseType,
  ProjectIdeasResponseType,
  UpdateProjectIdeaStatusType,
} from '@/app/features/idea-management/types/project-idea.types';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';

// GET
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

// CREATE
export const createProjectIdea = async (formData: CreateProjectIdeaType) => {
  try {
    const response = await apiClient.post<ProjectIdeaCreateResponseType>(
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
export const editProjectIdea = async (
  id: number,
  formData: EditProjectIdeaType,
) => {
  try {
    const response = await apiClient.patch<ProjectIdeaEditResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}/${id}`,
      formData,
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
  formData: UpdateProjectIdeaStatusType,
) => {
  try {
    const response = await apiClient.patch<ProjectIdeaStatusUpdateResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}/${id}`,
      formData,
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
    const response = await apiClient.delete<ProjectIdeaDeleteResponseType>(
      `${API_ENDPOINTS.PROJECT_IDEA}/${id}`,
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
