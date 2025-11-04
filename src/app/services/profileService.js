import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const profileService = {
  // Get profile data by user ID
  getProfileData: async (userId) => {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.GET_PROFILE_DATA}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
    }
  },

  // Update profile data
  updateProfile: async (profileId, profileData) => {
    try {
      const response = await apiClient.patch(
        `${API_ENDPOINTS.UPDATE_PROFILE}?id=${profileId}`,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile data:", error);
      throw error;
    }
  },
};

export default profileService;
