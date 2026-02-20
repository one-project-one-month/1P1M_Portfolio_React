import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { ConfigRequest } from '@/types/config.type';

export const getConfigurations = async (formTemplateName = '') => {
  const url = `${API_ENDPOINTS.GET_CONFIGURATIONS}/${formTemplateName}`;
  const response = await apiClient.get(url);
  return response.data;
};

export const createConfigurations = async (
  headerConstantValue: string,
  data: ConfigRequest,
) => {
  const url = `${API_ENDPOINTS.CONFIGURATIONS_DETAIL}/${headerConstantValue}`;
  const response = await apiClient.post(url, data);
  return response.data;
};

export const updateConfigOption = async (
  optionId: number,
  data: ConfigRequest,
) => {
  const url = `${API_ENDPOINTS.CONFIGURATIONS_DETAIL}/${optionId}`;
  const response = await apiClient.put(url, data);
  return response.data;
};

export const deleteConfigOption = async (optionId: number) => {
  const url = `${API_ENDPOINTS.CONFIGURATIONS_DETAIL}/${optionId}`;
  const response = await apiClient.delete(url);
  return response.data;
};
