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
  REGISTER: "/portfolio/api/v1/auth/users/signup",
  CREATE_PROJECT: "/portfolio/api/v1/project-portfolio",
  UPLOAD_PROJECT_IMAGE: "/portfolio/api/v1/project-portfolio/uploadFile",
  APPROVED_IDEAS: "/portfolio/api/v1/approved-ideas",
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const getAuthConfig = (additionalConfig = {}) => {
  return {
    ...additionalConfig,
    headers: {
      ...getAuthHeaders(),
      ...additionalConfig.headers,
    },
  };
};
