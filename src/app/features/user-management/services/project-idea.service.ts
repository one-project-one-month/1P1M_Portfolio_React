import apiClient from '@/api/axios';
import type {
  AssignLeaderResponseType,
  DeveloperProfileResponseType,
  GetDeveloperParamsType,
  IdeaDeleteResponseType,
  IdeaEditResponseType,
  IdeaStatusUpdateResponseType,
  UpdateProjectIdeaResponseType,
  UpdateProjectIdeaType,
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

export const getDeveloperProfile = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
  status,
}: GetDeveloperParamsType) => {
  try {
    const response = await apiClient.get<DeveloperProfileResponseType>(
      API_ENDPOINTS.GET_PROFILE,
      {
        params: {
          keyword,
          page,
          size,
          status,
          sortField,
          sortDirection,
        },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError<{ message?: string }>;
    const backendMessage = e.response?.data?.message || e.message;
    console.error('Error fetching user:', backendMessage);
    // throw {
    //   success: false,
    //   message: backendMessage,
    // };
    throw new Error(backendMessage);
  }
};

export const editProjectIdeaService = async (
  projectIdeaId: number,
  formData: UpdateProjectIdeaType,
) => {
  try {
    const response = await apiClient.patch<UpdateProjectIdeaResponseType>(
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

export const assignLeaderService = async (
  projectIdeaId: number,
  devId: number,
) => {
  try {
    const response = await apiClient.patch<AssignLeaderResponseType>(
      `${API_ENDPOINTS.ASSIGN_LEADER}?projectIdeaId=${projectIdeaId}&devId=${devId}`,
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Assign leader error:', e);
    throw e;
  }
};
