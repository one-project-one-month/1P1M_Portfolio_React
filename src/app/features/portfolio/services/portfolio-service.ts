import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponseType } from '@/types/api-response.type';
import type {
  GetPortfolioParamsType,
  PortfolioProjectType,
} from '@/types/portfolio.type';
import type { ProjectData } from '../../portfolio-management/constants/data';

export async function reactToProject(projectId: number) {
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
    const response = await apiClient.get<ApiResponseType<PortfolioProjectType>>(
      '/portfolio/api/v2/project-portfolio',
      {
        params: { keyword, page, size, sortField, sortDirection },
      },
    );

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export async function getProjectPortfolioDetails(projectId: string) {
  try {
    const url = `${API_ENDPOINTS.GET_PROJECT_PORTFOLIO}?projectPortfolioId=${projectId}`;
    const response = await apiClient.get(url);

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

export async function createProjectPortfolio(
  requestBody: Partial<ProjectData>,
) {
  try {
    const url = `${API_ENDPOINTS.GET_PROJECT_PORTFOLIO}`;
    const response = await apiClient.post(url, requestBody);

    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data?.message ?? { message: 'Failed to create project' }
    );
  }
}
