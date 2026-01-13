import apiClient from '@/api/axios';
import type { RegisterListProps } from '@/types/register';
import { AxiosError } from 'axios';

export async function getAllOpomRegister() {
  try {
    const params = {
      page: 1,
      size: 12,
    };

    const { data } = await apiClient.get<{
      success: number;
      data: RegisterListProps[];
      meta: { currentPage: number; totalPages: number; totalItems: number };
      message: string;
    }>('/portfolio/api/v1/auth/getAllOpomRegister', { params });

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
      message: data.message || 'OpmRegister List fetched successfully',
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
