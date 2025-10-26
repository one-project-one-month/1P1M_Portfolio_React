const DEFAULT_API_URL = "http://localhost:8080/";
import AppConfig from "./appConfig";

export const getApiBaseUrl = () => {
  return AppConfig.API_URL;
};

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
