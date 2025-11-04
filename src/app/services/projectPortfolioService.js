import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

/**
 * Fetch all project portfolios with pagination, sorting, and search.
 */
export async function getAllProjectProfiles({
  page = 0,
  size = 6,
  sortField = "name",
  sortDirection = "desc",
  keyword = "",
}) {
  const params = new URLSearchParams({
    page,
    size,
    sortField,
    sortDirection,
  });

  if (keyword.trim() !== "") {
    params.append("keyword", keyword.trim());
  }

  const url = `${API_ENDPOINTS.GET_ALL_PROJECTS}?${params.toString()}`;
  const response = await apiClient.get(url);
  return response.data;
}

/**
 * React (like) to a specific project portfolio.
 */
export async function reactToProject(projectId) {
  const url = `${API_ENDPOINTS.REACT_PROJECT}?projectPortfolioId=${projectId}`;
  const response = await apiClient.post(url);
  return response.data;
}

/**
 * Get detailed information about a specific project portfolio.
 */
export async function getProjectPortfolioDetails(projectId) {
  const url = `${API_ENDPOINTS.GET_PROJECT_PORTFOLIO}?projectPortfolioId=${projectId}`;
  const response = await apiClient.get(url);
  return response.data;
}

export async function updateProjectPortfolio(projectPortfolioId, projectData) {
  try {
    const url = `${
      API_ENDPOINTS.PROJECT_PORTFOLIO || "/portfolio/api/v1/project-portfolio"
    }?projectPortfolioId=${projectPortfolioId}`;
    const response = await apiClient.patch(url, projectData);
    return response.data;
  } catch (error) {
    console.error("Error updating project portfolio:", error);
    throw error.response?.data || error;
  }
}

export async function deleteProjectPortfolio(projectPortfolioId) {
  try {
    const url = `${
      API_ENDPOINTS.PROJECT_PORTFOLIO || "/portfolio/api/v1/project-portfolio"
    }?projectPortfolioId=${projectPortfolioId}`;
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting project portfolio:", error);
    throw error.response?.data || error;
  }
}
