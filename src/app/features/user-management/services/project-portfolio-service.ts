import apiClient from '@/api/axios';
import type {
  PortfolioReactResponseType,
  PortfolioStatusResponseType,
} from '@/app/features/user-management/types/user-management.types';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';

export const portfolioStatusChangeService = async (
  projectPortfolioId: number,
  status: string,
) => {
  try {
    const response = await apiClient.patch<PortfolioStatusResponseType>(
      API_ENDPOINTS.UPDATE_PROJECT_STATUS_V2,
      {
        projectPortfolioId,
        status,
      },
    );

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error idea status change error:', e);
    throw e;
  }
};

export const projectPortfolioReactService = async (
  projectPortfolioId: number,
) => {
  try {
    const response = await apiClient.post<PortfolioReactResponseType>(
      `${API_ENDPOINTS.REACT_PROJECT}`,
      null,
      { params: { projectPortfolioId } },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error reacting to project portfolio:', e);
    throw e;
  }
};

export const projectPortfolioUnReactService = async (
  projectPortfolioId: number,
) => {
  try {
    const response = await apiClient.delete<PortfolioReactResponseType>(
      `${API_ENDPOINTS.UNREACT_PROJECT}`,
      {
        params: { projectPortfolioId },
      },
    );
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error unreacting to project portfolio:', e);
    throw e;
  }
};
