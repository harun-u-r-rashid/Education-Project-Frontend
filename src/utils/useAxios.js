import axios from "axios";
import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";

const useAxios = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add Authorization header conditionally
  axiosInstance.interceptors.request.use(async (req) => {
    // Check if the access token exists
    if (accessToken) {
      // Check if the access token is expired
      if (isAccessTokenExpired()) {
        // If expired, get a new token using the refresh token
        const response = await getRefreshedToken(refreshToken);
        setAuthUser(response.access, response.refresh);
        req.headers.Authorization = `Bearer ${response.access}`;
      } else {
        // If not expired, use the current access token
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return req;
  });

  return axiosInstance;
};

export default useAxios;
