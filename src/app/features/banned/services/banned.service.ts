import apiClient from '@/api/axios';

export const getUserBanStatus = async (userId: string) => {
  const { data } = await apiClient.get(
    `/portfolio/api/v1/auth/users/${userId}/ban-status`,
  );

  return data;
};
