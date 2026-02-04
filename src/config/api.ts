export const API_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,

  // OAuth Configuration
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,

  // OAuth Redirect URIs
  GITHUB_REDIRECT_URI: import.meta.env.VITE_GITHUB_REDIRECT_URI,

  GOOGLE_REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
};

export const API_ENDPOINTS = {
  GITHUB_EXCHANGE: '/portfolio/api/v1/auth/users/exchangeGitHub',
  GOOGLE_EXCHANGE: '/portfolio/api/v1/auth/users/exchangeGoogle',
  LOGIN: '/portfolio/api/v1/auth/users/login',
  CHECK_EMAIL: '/portfolio/api/v1/auth/users/checkEmail',
  SEND_OTP: '/portfolio/api/v1/auth/users/send-otpCode',
  VERIFY_OTP: '/portfolio/api/v1/auth/users/verify-otpCode',
  REGISTER: '/portfolio/api/v1/auth/users/signup',
  SETUP_PROFILE: '/portfolio/api/v1/profiles/create/',
  GET_PROFILE: '/portfolio/api/v1/profiles',
  CREATE_PROJECT: '/portfolio/api/v2/project-portfolio',
  PROJECT_IDEA: '/portfolio/api/v1/project-idea',
  UPLOAD_PROJECT_IMAGE: '/portfolio/api/v1/project-portfolio/uploadFile',
  UPLOAD_DEV_IMAGE: '/portfolio/api/v1/profiles/uploadFile',
  APPROVED_IDEAS: '/portfolio/api/v1/approved-ideas',
  FORGOT_PASSWORD: '/portfolio/api/v1/auth/users/password/forgot',
  RESET_PASSWORD: '/portfolio/api/v1/auth/users/password/reset',
  GET_ALL_PROJECTS: '/portfolio/api/v2/project-portfolio',
  REACT_PROJECT: '/portfolio/api/v2/project-portfolio/react',
  GET_PROJECT_PORTFOLIO: '/portfolio/api/v2/project-portfolio',
  OPOM_REGISTER: '/portfolio/api/v1/auth/register',
  GET_ALL_OPOM_REGISTER: '/portfolio/api/v1/auth/getAllOpomRegister',
  GET_PROFILE_DATA: '/portfolio/api/v1/auth/users/getProfileData',
  UPDATE_PROFILE: '/portfolio/api/v1/profiles',
  GET_PROJECT_IDEAS: '/portfolio/api/v1/project-idea/getAllProjectIdeas',
  TIMELINES: 'portfolio/api/v1/timelines',

  // Admin
  USER_MANAGEMENT: '/portfolio/api/v1/admin/userManagement',
  BAN_USER: '/portfolio/api/v1/admin/userManagement/ban',
};

export const getApiEndpoint = (endpoint: keyof typeof API_ENDPOINTS) => {
  return `${API_CONFIG.API_URL}${API_ENDPOINTS[endpoint]}`;
};
