import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";


export const setupDevProfile=async(form)=>{
  try {
    const response=await apiClient.post(API_ENDPOINTS.SETUP_PROFILE,{form});
    return response.data;
  } catch (error) {
    console.error("Error creating dev profiles:",error);
    throw error.response?.data || error
  }
}