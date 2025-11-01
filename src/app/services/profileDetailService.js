import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";

export const getDeveloperProfile = async (devId) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.GET_PROFILE}/${devId}`);
    const profiles = res.data.data || [];
    return profiles.find((p) => p.dev_id === Number(devId));
  } catch (error) {
    console.error("Error fetching developer profile:", error);
    throw error;
  }
};


//  Get Developer's Project Ideas
export const getDeveloperProjectIdeas = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.data?.[0]?.dev_id;

    if (!userId) {
      console.warn(" No userId found in localStorage");
      return [];
    }

    const res = await apiClient.get(API_ENDPOINTS.APPROVED_IDEAS, getAuthConfig());
    const allIdeas = res.data.data || [];
    return allIdeas.filter((idea) => idea.dev_id === Number(userId));
  } catch (error) {
    console.error("Error fetching project ideas:", error);
    throw error;
  }
};

//  Get Developer's Approved Projects
export const getDeveloperApprovedProjects = async (devId) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.APPROVED_IDEAS, getAuthConfig());
    const approved = res.data.data || [];
    return approved.filter((p) => p.dev_id === Number(devId));
  } catch (error) {
    console.error("Error fetching approved projects:", error);
    throw error;
  }
};

  export const getProfileData = async (userId) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE_DATA, {
      params: { userId }, // ✅ if backend requires userId query param
      ...getAuthConfig(),
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    throw error;
  }
};

  //Get Developer Project Portfolios
  export const getDeveloperPortfolios = async (devId) => {
    try {
      const res = await apiClient.get(
        `${API_ENDPOINTS.CREATE_PROJECT}/getAllProjectProfiles`,
        getAuthConfig()
      );
      const portfolios = res.data.data || [];
      return portfolios.filter((p) =>
        p.assignedDevs?.devProfileIds?.includes(Number(devId))
      );
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      throw error;
    }
  };
