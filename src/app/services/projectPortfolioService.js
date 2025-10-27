import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

/**
 * Fetch all project portfolios with pagination, sorting, and search.
 */
export async function getAllProjectProfiles({ page = 0, size = 6, sortField = "name", sortDirection = "desc", keyword = "" }) {
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
