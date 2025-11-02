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
  REGISTER: "/portfolio/api/v1/auth/users/signup",
  SETUP_PROFILE: "/portfolio/api/v1/profiles/create/",
  GET_PROFILE: "/portfolio/api/v1/profiles",
  CREATE_PROJECT: "/portfolio/api/v1/project-portfolio",
  PROJECT_IDEA: "/portfolio/api/v1/project-idea",
  UPLOAD_PROJECT_IMAGE: "/portfolio/api/v1/project-portfolio/uploadFile",
  UPLOAD_DEV_IMAGE:"/portfolio/api/v1/profiles/uploadFile",
  APPROVED_IDEAS: "/portfolio/api/v1/approved-ideas",
  FORGOT_PASSWORD: "/portfolio/api/v1/auth/users/password/forgot",
  RESET_PASSWORD: "/portfolio/api/v1/auth/users/password/reset",
  GET_ALL_PROJECTS: "/portfolio/api/v1/project-portfolio/getAllProjectProfiles",
  REACT_PROJECT: "/portfolio/api/v1/project-portfolio/react",
  GET_PROJECT_PORTFOLIO: "/portfolio/api/v1/project-portfolio",
  OPOM_REGISTER:"/portfolio/api/v1/auth/register",
  GET_ALL_OPOM_REGISTER:"/portfolio/api/v1/auth/getAllOpomRegister"
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
