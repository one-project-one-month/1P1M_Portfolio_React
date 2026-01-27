import apiClient from '@/api/axios';

export const exchangeGitHub = async (code: string) => {
  try {
    const response = await apiClient.post(
      '/portfolio/api/v1/auth/users/exchangeGitHub',
      {
        code,
      },
    );
    console.log('exchange code', response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exchangeGoogleCode = async (code: string) => {
  try {
    const response = await apiClient.post(
      '/portfolio/api/v1/auth/users/exchangeGoogle',
      { code },
    );
    console.log('Google exchange response:', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
