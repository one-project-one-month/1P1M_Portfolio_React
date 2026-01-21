import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import { getAuthConfig } from '@/config/auth';
import type { OpomRegisterForm } from '@/types/common';

export const opomRegister = async (form: OpomRegisterForm) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.OPOM_REGISTER,
      form,
      getAuthConfig(),
    );
    return response.data;
  } catch (error) {
    console.error('Error in OPOM registration:', error);
  }
};
