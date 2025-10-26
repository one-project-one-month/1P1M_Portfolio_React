import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";

export const getDevProfiles = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.GET_PROFILE,
      getAuthConfig()
    ); //end point    
    return response.data;
  } catch (error) {
    console.error("Error fetching developer", error);
    throw error.response?.data || error;
  }
};

export const setupDevProfile = async (form) => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !token)
      throw new Error("Missing token. You are not logged in.");

    const payload = {
      ...form,
    };

    const response = await apiClient.post(
      API_ENDPOINTS.SETUP_PROFILE + `${user.id}` || "/profiles",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Profile setup success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating dev profiles:", error);
    throw error.response?.data || error;
  }
};
