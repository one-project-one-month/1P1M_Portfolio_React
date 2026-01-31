import apiClient from '@/api/axios.ts';
import type { Timeline } from '@/app/features/timeline-management/services/types.ts';
import { API_ENDPOINTS } from '@/config/api.ts';

export const getTimelineData = async (): Promise<Timeline[]> => {
  try {
    const response = await apiClient.get<Timeline[]>(
      API_ENDPOINTS.GET_ALL_TIMELINES,
    );

    console.log('API Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Timeline API Error:', error);
    throw error;
  }
};
