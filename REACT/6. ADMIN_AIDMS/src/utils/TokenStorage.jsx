export const getToken = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  } catch (error) {
    return { accessToken: null, refreshToken: null };
  }
};

export const storeToken = async (accessToken, refreshToken) => {
  try {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const clearToken = async () => {
  try {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    console.log("Working");
  } catch (error) {
    console.error("Error clearing tokens", error);
  }
};
