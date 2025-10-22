import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const getDevProfiles = async () => {
  try {
    const response = await apiClient.get("/profiles"); //end point
    return response.data;
  } catch (error) {
    console.error("Error fetching developer", error);
    throw error;
  }
};

export const setupDevProfile = async (form) => {
  try {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);

    const response = await apiClient.post(
      API_ENDPOINTS.SETUP_PROFILE + userJson.id,
      form
    );

    console.log("END_POINt", API_ENDPOINTS.SETUP_PROFILE + userJson.id);

    return response.data;
  } catch (error) {
    console.error("Error creating dev profiles:", error);
    throw error.response?.data || error;
  }
};
