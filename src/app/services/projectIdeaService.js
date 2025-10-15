import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const ProjectIdeaList = async (page = 1, limit = 6) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.PROJECT_IDEA}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project ideas:", error);
    throw error.response?.data || error;
  }
};


export const updateProjectIdeaStatus = async (projectIdeaId, status) => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.PROJECT_IDEA, null, {
      params: { projectIdeaId, status },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project idea status:", error);
    throw error.response?.data || error;
  }
};
