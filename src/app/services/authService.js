import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const exchangeGithubCode = async (code) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GITHUB_EXCHANGE, {
      code,
    });

    return response.data;
  } catch (error) {
    console.error("Error exchanging GitHub code:", error);
    throw error.response?.data || error;
  }
};

export const exchangeGoogleCode = async (code) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GOOGLE_EXCHANGE, {
      code,
    });

    return response.data;
  } catch (error) {
    console.error("Error exchanging Google code:", error);
    throw error.response?.data || error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CHECK_EMAIL, {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Error checking email:", error);
    throw error.response?.data || error;
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data || error;
  }
};
