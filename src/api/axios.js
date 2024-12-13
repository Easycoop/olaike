import axios from "axios";
import { store } from "../redux/store";
import toastManager from "../components/ui/toast/ToasterManager";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const state = store.getState();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout of 10 seconds
  withCredentials: false, // Send cookies when making requests
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Default status checking function
  },
});

// Request interceptor to add tokens to requests
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const { accessToken } = state.auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      try {
        const response = await api.post("/auth/refresh/", {
          refresh: refreshToken,
        });

        const accessToken = response.data.access;
        store.dispatch({ type: "UPDATE_ACCESS_TOKEN", payload: accessToken });
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Handle token refresh failure

        store.dispatch({ type: "LOGOUT" });
        toastManager.addToast({
          message: "Session has expired. Please log in again.",
          type: "error",
        });
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
