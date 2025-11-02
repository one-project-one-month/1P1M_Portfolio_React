import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";

export const getDevProfiles = async (params = {}, signal = null) => {
  try {
    const queryParams = new URLSearchParams();

    // Add parameters if they exist
    if (params.keyword) queryParams.append("keyword", params.keyword);
    if (params.page !== undefined) queryParams.append("page", params.page);
    if (params.size !== undefined) queryParams.append("size", params.size);
    if (params.sortField) queryParams.append("sortField", params.sortField);
    if (params.sortDirection)
      queryParams.append("sortDirection", params.sortDirection);

    const url = `${API_ENDPOINTS.GET_PROFILE}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const config = {
      ...getAuthConfig(),
      ...(signal && { signal }), // Add AbortController signal if provided
    };

    const response = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    // Don't log AbortError as it's expected when cancelling requests
    if (error.name !== "AbortError") {
      console.error("Error fetching developer", error);
    }
    throw error.response?.data || error;
  }
};

export const setupDevProfile = async (form) => {
  
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    console.log(API_ENDPOINTS.SETUP_PROFILE + `${user.id}` );

    if (!user || !token)
      throw new Error("Missing token. You are not logged in.");

    const payload = {
      ...form,
    };

    const response = await apiClient.post(
      API_ENDPOINTS.SETUP_PROFILE + `${user.id}` ,
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

export const uploadDevImage=async(file)=>{

  try {
     const user = JSON.parse(localStorage.getItem("user"));
    
    const response= await apiClient.patch(API_ENDPOINTS.UPLOAD_DEV_IMAGE + '/' + `${user.id}`, file);
    console.log("Uploading image...");
    
    return response.data;
  } catch (error) {
    console.log("Error at upoading image");
    
    throw error?.response?.data || error
  }

}