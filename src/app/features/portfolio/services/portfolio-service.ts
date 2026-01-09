import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { GetPortfolioParamsType } from '@/types/portfolio.types';

export async function reactToProject(projectId: string) {
  const url = `${API_ENDPOINTS.REACT_PROJECT}?projectPortfolioId=${projectId}`;
  const response = await apiClient.post(url);

  return response.data;
}

export const getProjectPortfolio = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetPortfolioParamsType) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ALL_PROJECTS, {
      params: { keyword, page, size, sortField, sortDirection },
    });

    console.log('response', response.data);
    // return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export async function getProjectPortfolioDetails(projectId: string) {
  const url = `${API_ENDPOINTS.GET_PROJECT_PORTFOLIO}?projectPortfolioId=${projectId}`;
  const response = await apiClient.get(url);

  return response.data;
}
