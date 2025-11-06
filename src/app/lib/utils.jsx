import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const authUtils = {
  getUser: () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem("token") || Cookies.get("auth_token");
  },

  isAuthenticated: () => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Cookies.remove("auth_token");
  },

  getProfilePicture: () => {
    const user = authUtils.getUser();
    return user?.profile_picture || null;
  },

  getDisplayName: () => {
    const user = authUtils.getUser();
    return user?.username || user?.email || "User";
  },


  getRole:()=>{
  const user =authUtils.getUser();
  return user ? user.role : null
}
};




