import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";

export const exchangeGithubCode = async (code) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GITHUB_EXCHANGE, {
      code,
    });
    console.log("GitHub exchange response:", response);
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
    console.log("Google exchange response:", response);
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

    const data = response.data?.data;

    if (!data?.token) throw new Error("Invalid response: no token found");

    // store token & user data
    localStorage.setItem("token", data.token);

    const userInfo = {
      id: data.userId,
      username: data.username,
      email: data.email,
      role: data.role,
      roleId: data.roleId,
      isNewUserLogin: data.isNewUserLogin,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));

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

export const signupWithEmail = async (email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error signup:", error);

    throw (
      error.response?.data || {
        message: "Network or server error. Please try again.",
      }
    );
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });

    return response.data;
  } catch (error) {
    // console.error("Error in forgot password:", error);
    throw error.response?.data || error;
  }
};

export const opomRegister = async (form) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.OPOM_REGISTER,
      form,
      getAuthConfig()
    );

    return response.data;
  } catch (error) {
    console.error("Error in OPOM registration:", error);
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
      email,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error.response?.data || error;
  }
};
