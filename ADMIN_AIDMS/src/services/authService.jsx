import apiClient from "../services/apiClient"; // import your configured axios instance

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await apiClient.post("/AUTH-SERVICE/users/refreshtoken", {
      token: refreshToken,
    });
    return response.data; // return the response containing the new access token and refresh token
  } catch (error) {
    console.error("Error refreshing access token", error);
    return null; // return null if there's an error
  }
};
