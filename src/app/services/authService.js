import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

/**
 * Exchange GitHub OAuth code for access token
 * @param {string} code - The authorization code from GitHub OAuth
 * @returns {Promise<Object>} - User data and tokens
 */
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

/**
 * Log in with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - User data and tokens
 */
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
