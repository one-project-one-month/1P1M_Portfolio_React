import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponseType } from '@/types/api-response.type';
import type {
  GetPortfolioParamsType,
  PortfolioProjectType,
  ProjectRequestBody,
} from '@/types/portfolio.type';

export async function reactToProject(projectId: number) {
  const url = `${API_ENDPOINTS.REACT_PROJECT}?projectPortfolioId=${projectId}`;
  const response = await apiClient.post(url);
  console.log(response);

  return response.data;
}

export const getProjectPortfolio = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
  projectPortfolioStatus,
}: GetPortfolioParamsType) => {
  try {
    const response = await apiClient.get<
      ApiResponseType<PortfolioProjectType[]>
    >('/portfolio/api/v2/project-portfolio', {
      params: {
        keyword,
        page,
        size,
        sortField,
        sortDirection,
        projectPortfolioStatus,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export async function getProjectPortfolioDetails(projectId: number | string) {
  try {
    const url = `${API_ENDPOINTS.GET_PROJECT_PORTFOLIO}/${projectId}`;
    const response = await apiClient.get(url);

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

export async function createProjectPortfolio(requestBody: ProjectRequestBody) {
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

export async function uploadProjectImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(
      API_ENDPOINTS.UPLOAD_PROJECT_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.fileUrl;
  } catch (error: any) {
    throw error.response?.data?.message ?? { message: 'Image upload failed' };
  }
}

export async function updateProjectPortfolio(
  projectId: string,
  requestBody: Partial<ProjectRequestBody>,
) {
  try {
    const url = `${API_ENDPOINTS.GET_PROJECT_PORTFOLIO}/${projectId}`;
    const response = await apiClient.put(url, requestBody);
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data?.message ?? { message: 'Failed to update project' }
    );
  }
}
