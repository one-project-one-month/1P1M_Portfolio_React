import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Auth utility functions
export const authUtils = {
  // Get stored user data
  getUser: () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  // Get auth token from localStorage or cookies
  getToken: () => {
    return localStorage.getItem("token") || Cookies.get("auth_token");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },

  // Clear auth data
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Cookies.remove("auth_token");
  },

  // Get user profile picture
  getProfilePicture: () => {
    const user = authUtils.getUser();
    return user?.profile_picture || null;
  },

  // Get user display name (username or email)
  getDisplayName: () => {
    const user = authUtils.getUser();
    return user?.username || user?.email || "User";
  },
};
