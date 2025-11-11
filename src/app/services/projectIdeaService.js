import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const ProjectIdeaList = async (
  page = 0,
  limit = 6,
  keyword = "",
  filter,
  sortDirection
) => {
  try {
    let sortField = "id";

    if (filter === "Popular") {
      sortField = "popular";
      sortDirection = "asc";
    } else if (filter === "Oldest") {
      sortField = "id";
      sortDirection = "asc";
    } else if (filter === "Newest") {
      sortField = "id";
      sortDirection = "desc";
    }

    const response = await apiClient.get(
      `${API_ENDPOINTS.PROJECT_IDEA}/getAllProjectIdeas`,
      {
        params: {
          page,
          size: limit,
          sortField,
          sortDirection,
          keyword,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching project ideas:", error);
    throw error.response?.data || error;
  }
};

export const updateProjectIdeaStatus = async (projectIdeaId, status) => {
  try {
    const response = await apiClient.patch(
      `${API_ENDPOINTS.PROJECT_IDEA}?projectIdeaId=${projectIdeaId}&status=${status}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project idea status:", error);
    throw error.response?.data || error;
  }
};

export const reactProjectIdea = async (projectId) => {
  return apiClient.post(
    `${API_ENDPOINTS.PROJECT_IDEA}/react?projectIdeaId=${projectId}`
  );
};

export const unreactProjectIdea = async (projectId) => {
  return apiClient.delete(
    `${API_ENDPOINTS.PROJECT_IDEA}/unreact?projectIdeaId=${projectId}`
  );
};

export const getProjectReactionCount = async (projectId) => {
  return apiClient.get(
    `${API_ENDPOINTS.PROJECT_IDEA}/react/count?project_id=${projectId}`
  );
};

export const createProjectIdea = async (projectData) => {
  const response = await apiClient.post(
    `${API_ENDPOINTS.PROJECT_IDEA}`,
    projectData
  );
  return response.data;
};

export const getProjectIdeaById = async (projectIdeaId) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.PROJECT_IDEA}/${projectIdeaId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project idea:", error);
    throw error.response?.data || error;
  }
};

export const updateProjectIdea = async (
  projectIdeaId,
  projectData,
  status = null
) => {
  try {
    let url = `${API_ENDPOINTS.PROJECT_IDEA}?projectIdeaId=${projectIdeaId}`;
    if (status) {
      url += `&status=${status}`;
    }

    const response = await apiClient.patch(url, projectData);
    return response.data;
  } catch (error) {
    console.error("Error updating project idea:", error);
    throw error.response?.data || error;
  }
};
