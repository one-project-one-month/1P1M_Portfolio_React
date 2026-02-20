import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { AxiosError } from 'axios';
import type {
  GetAllOpomRegisterParams,
  GetAllOpomRegisterResponseType,
} from '../types/opom-registered-list-type';

export const getOpomRegisteredPeopleList = async (
  params: GetAllOpomRegisterParams,
): Promise<GetAllOpomRegisterResponseType> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ALL_OPOM_REGISTER, {
      params,
    });
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error('Error fetching project ideas:', e);
  }
  throw {
    success: false,
    message: 'Failed to fetch project ideas',
  };
};
