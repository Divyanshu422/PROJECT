import axios from "axios";
import { refreshAccessToken } from "./authService";
import { getToken, storeToken } from "../utlis/TokenStorage";

// Function to logout the user
const logoutUser = () => {
  // Clear the stored tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Redirect to login page or show a modal for re-login
  window.location.href = "/login"; // Change to the correct login route if needed
};

// Create the axios instance
const apiClient = axios.create({
  baseURL: "http://10.224.1.182:3026", // Your API base URL
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Get the access token from storage
    const { accessToken } = await getToken();

    // Add the access token to the Authorization header if it's not already set
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling token expiry
apiClient.interceptors.response.use(
  (response) => response, // Directly return the response if no error
  async (error) => {
    const originalRequest = error?.config;

    // Check for a 403 error (Forbidden) and retry if the token is expired
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite loop of retrying

      try {
        // Get the refresh token from storage
        const { refreshToken } = await getToken();

        // Attempt to refresh the access token using the refresh token
        const newTokens = await refreshAccessToken(refreshToken);

        if (newTokens) {
          // Store the new access and refresh tokens
          await storeToken(newTokens.accessToken, newTokens.refreshToken);

          // Update the Authorization header with the new access token
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.accessToken}`;

          // Retry the original request with the new token
          return apiClient(originalRequest);
        } else {
          // If token refresh fails, log the user out
          logoutUser();
          return Promise.reject(
            new Error("Session expired. Please log in again.")
          );
        }
      } catch (refreshError) {
        // If refreshing the token fails, log the user out
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default apiClient;
