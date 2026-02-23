import axios from "axios";

const API_BASE_URL = "https://real-tractors-and-equipments.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/user/login", {
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "Login failed";
      return {
        success: false,
        message,
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response
      return {
        success: false,
        message: "No response from server. Please check your connection.",
      };
    } else {
      // Other errors
      return {
        success: false,
        message: error.message || "An error occurred",
      };
    }
  }
};

export const logout = () => {
  // Clear auth token from API client
  delete apiClient.defaults.headers.common["Authorization"];
};

// Set auth token in API client headers
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};
