const API_URL_V1 = import.meta.env.VITE_API_URL_V1;

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const makeApiRequest = async (endpoint, options = {}) => {
  try {
    let accessToken = getAccessToken();

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    options = {
      ...options,
      credentials: "include",
    };

    let response = await fetch(endpoint, options);
    let result = await response.json();

    if (
      response.status === 401 &&
      result.message === "Access Token has expired"
    ) {
      console.warn("Access Token expired. Refreshing token...");

      const newAccessTokenResponse = await fetch(
        `${API_URL_V1}/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (newAccessTokenResponse.ok) {
        const newAccessTokenData = await newAccessTokenResponse.json();
        const newAccessToken = newAccessTokenData?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token received from refresh endpoint.");
        }

        localStorage.setItem("accessToken", newAccessToken);
        options.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        response = await fetch(endpoint, options);
        result = await response.json();
      } else {
        console.error("Failed to refresh token.");
        throw new Error("Session expired. Please log in again.");
      }
    }

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || "Request failed");
    }
  } catch (error) {
    console.error("Error in makeApiRequest:", error.message || "Unknown error");
    throw error;
  }
};

export { makeApiRequest };
