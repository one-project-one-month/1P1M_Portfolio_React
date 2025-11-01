import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const getOpomRegsiter = async ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}) => {

  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ALL_OPOM_REGISTER, {
      params: { keyword, page, size, sortField, sortDirection },
    });

    return response.data;
  } catch (error) {
    console.log("GET REGISTER LIST", error);
    throw error.response?.data || error;
  }
};
