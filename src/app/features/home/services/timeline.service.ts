import apiClient from '@/api/axios';

export const getLatestTimeline = async () => {
  try {
    const response = await apiClient.get('/portfolio/api/v1/timelines/latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest timeline:', error);
    throw error;
  }
};
