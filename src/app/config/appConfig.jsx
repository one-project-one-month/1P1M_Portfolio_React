const DEFAULT_API_URL = "https://onep1m-portfolio-backend.onrender.com";

const AppConfig = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "OPOM Portfolio",
  BASE_URL: import.meta.env.VITE_BASE_URL || "http://localhost:5173",
  API_URL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
};

export default AppConfig;
