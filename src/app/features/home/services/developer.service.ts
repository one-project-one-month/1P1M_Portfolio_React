import apiClient from '@/api/axios';

export const getRandomProfile = async () => {
  try {
    const res = await apiClient.get('/portfolio/api/v1/profiles/random');
    return res.data;
  } catch (error) {
    console.error('Error fetching random profile:', error);
    throw error;
  }
};
