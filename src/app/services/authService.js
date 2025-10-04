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
 * Exchange Google OAuth code for access token
 * @param {string} code - The authorization code from Google OAuth
 * @returns {Promise<Object>} - User data and tokens
 */
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

/**
 * Check if an email exists in the system
 * @param {string} email - The email to check
 * @returns {Promise<Object>} - Response indicating if email exists
 */
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

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - User data and tokens
 */
export const registerUser = async (email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
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
