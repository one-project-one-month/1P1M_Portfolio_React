import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";


export const getProjectPortfolio = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ALL_PROJECTS, {
      params: { keyword, page, size, sortField, sortDirection },
    });
    return response.data;
  } catch (error) {
    throw error || error?.response?.data
  }
};
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
