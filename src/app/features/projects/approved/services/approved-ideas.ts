import apiClient from '@/api/axios';
import type { GetApprovedIdeas } from '@/types/project';
import { AxiosError } from 'axios';

export async function getApprovedIdeas() {
  try {
    const params = {
      page: 1,
      size: 12,
    };

    const { data } = await apiClient.get<GetApprovedIdeas>(
      '/portfolio/api/v1/approved-ideas',
      {
        params,
      },
    );

    return {
      success: data.success === 1,
      data: {
        projects: data.data,
        pagination: {
          currentPage: data.meta.currentPage,
          totalPages: data.meta.totalPages,
          totalItems: data.meta.totalItems,
          itemsPerPage: params.size,
          hasNext: data.meta.currentPage < data.meta.totalPages,
          hasPrevious: data.meta.currentPage > 1,
        },
      },
      message: data.message || 'Approved projects fetched successfully',
    };
  } catch (e) {
    const error = e as AxiosError;
    console.error('Error fetching approved projects:', error);
    throw {
      success: false,
      message: 'Failed to fetch approved projects',
    };
  }
}
