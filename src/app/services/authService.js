import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

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

export const sendOtpCode = async (email) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SEND_OTP, {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending OTP code:", error);
    throw error.response?.data || error;
  }
};

export const verifyOtpCode = async (email, otpCode) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_OTP, {
      email,
      otpCode,
    });

    return response.data;
  } catch (error) {
    console.error("Error verifying OTP code:", error);
    throw error.response?.data || error;
  }
};

export const signupWithEmail = async (email, password, cfmpassword) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, {
      email,
      password,
      password_confirmation: cfmpassword,
    });

    return response.data;
  } catch (error) {
    console.error("Error signup :", error);

    throw error.response?.data || {
      message: "Network or server error. Please try again.",
    };
  }
};

