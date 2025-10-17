import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const ProjectIdeaList = async (page = 0, limit = 6, sortField="name", sortDirection = "desc") => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.PROJECT_IDEA}/getAllProjectIdeas?page=${page}&size=${limit}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project ideas:", error);
    throw error.response?.data || error;
  }
};

export const updateProjectIdeaStatus = async (projectIdeaId, status) => {
  try {
    const response = await apiClient.patch(`${API_ENDPOINTS.PROJECT_IDEA}?projectIdeaId=${projectIdeaId}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error updating project idea status:", error);
    throw error.response?.data || error;
  }
};


export const reactProjectIdea = async (projectId) => {
  return apiClient.post(`${API_ENDPOINTS.PROJECT_IDEA}/react?projectIdeaId=${projectId}`);
};

export const unreactProjectIdea = async (projectId) => {
  return apiClient.delete(`${API_ENDPOINTS.PROJECT_IDEA}/unreact?projectIdeaId=${projectId}`);
};

export const getProjectReactionCount = async (projectId) => {
  return apiClient.get(`${API_ENDPOINTS.PROJECT_IDEA}/react/count?project_id=${projectId}`);
};
