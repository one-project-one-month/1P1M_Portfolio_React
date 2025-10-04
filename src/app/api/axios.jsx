import axios from "axios";
import { getApiBaseUrl } from "@/config/apiConfig";

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    console.log("=== AXIOS INTERCEPTOR ERROR ===");
    console.log("Status:", status);
    console.log("Error:", error);

    if (status === 401) {
      console.error("Authentication error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // TEMPORARILY DISABLE AUTOMATIC REDIRECT
      console.log("Would redirect to /login but disabled for debugging");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
