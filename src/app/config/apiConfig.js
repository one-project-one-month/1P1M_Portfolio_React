/**
 * Application environment configuration utilities
 */

import AppConfig from "./appConfig";

/**
 * Get the base URL for API requests based on the current environment
 * @returns {string} The API base URL
 */
export const getApiBaseUrl = () => {
  return AppConfig.API_URL;
};

/**
 * Get a complete API endpoint URL
 * @param {string} endpoint - The API endpoint path
 * @returns {string} The complete API URL
 */
export const getApiEndpoint = (endpoint) => {
  return `${getApiBaseUrl()}${endpoint}`;
};

export const API_ENDPOINTS = {
  GITHUB_EXCHANGE: "/portfolio/api/v1/auth/users/exchangeGitHub",
  GOOGLE_EXCHANGE: "/portfolio/api/v1/auth/users/exchangeGoogle",
  LOGIN: "/portfolio/api/v1/auth/users/login",
  CHECK_EMAIL: "/portfolio/api/v1/auth/users/checkEmail",
  SEND_OTP: "/portfolio/api/v1/auth/users/send-otpCode",
  VERIFY_OTP: "/portfolio/api/v1/auth/users/verify-otpCode",
};
