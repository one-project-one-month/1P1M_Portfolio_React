import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';
import type {
  CreateIdeaType,
  EditIdeaType,
  GetIdeaParamsType,
  IdeaCreateResponseType,
  IdeaDeleteResponseType,
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

// React to Project Idea
export const reactProjectIdea = async (projectIdeaId: number) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.REACT_PROJECT_IDEA,
      null,
      { params: { projectIdeaId } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error reacting to project idea:', e);
    throw {
      success: false,
      message: 'Failed to react to project idea',
    };
  }
};

// Unreact to Project Idea
export const unreactProjectIdea = async (projectIdeaId: number) => {
  try {
    const response = await apiClient.delete(
      API_ENDPOINTS.UNREACT_PROJECT_IDEA,
      { params: { projectIdeaId } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error unreacting to project idea:', e);
    throw {
      success: false,
      message: 'Failed to unreact to project idea',
    };
  }
};

// Update Project Idea Information
export const updateProjectIdeaInformation = async (
  projectIdeaId: number,
  formData: Partial<EditIdeaType>,
) => {
  try {
    const response = await apiClient.patch(
      API_ENDPOINTS.UPDATE_PROJECT_IDEA,
      formData,
      { params: { projectIdeaId } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error updating project idea information:', e);
    throw {
      success: false,
      message: 'Failed to update project idea information',
    };
  }
};

// Assign Leader to Project Idea
export const assignProjectLeader = async (
  projectIdeaId: number,
  leaderId: number,
) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.ASSIGN_LEADER, null, {
      params: { projectIdeaId, leaderId },
    });
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error assigning leader:', e);
    throw {
      success: false,
      message: 'Failed to assign leader',
    };
  }
};

// Get Reaction Count
export const getIdeaReactionCount = async (projectIdeaId: number) => {
  try {
    const response = await apiClient.get<{ data: number }>(
      API_ENDPOINTS.GET_IDEA_REACTION_COUNT,
      { params: { projectIdeaId } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error getting reaction count:', e);
    throw {
      success: false,
      message: 'Failed to get reaction count',
    };
  }
};
