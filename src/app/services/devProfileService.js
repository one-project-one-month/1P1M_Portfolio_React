import apiClient from "@/api/axios"; 

  export const getDevProfiles = async () => {
    try {
      const response = await apiClient.get("/profiles");//end point
      return response.data; 
    } catch (error) {
      console.error("Error fetching developer", error);
      throw error;
    }
  };