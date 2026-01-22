import axios from "axios";
import Constants from "expo-constants";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "../utils/authStorage";

const API_URL = Constants.expoConfig.extra.API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

/* ================= REQUEST INTERCEPTOR ================= */
const NO_AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/check-email",
  "/auth/send-otp",
  "/auth/verify-email",
  "/auth/resend-otp",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh-token",
];

api.interceptors.request.use(
  async (config) => {
    const isNoAuth = NO_AUTH_ENDPOINTS.some((url) => config.url?.includes(url));

    console.log("➡️ REQUEST:", config.url);
    console.log("➡️ IS NO AUTH:", isNoAuth);

    if (!isNoAuth) {
      const token = await getAccessToken();
      console.log("➡️ ATTACH TOKEN:", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    console.log("➡️ HEADERS:", config.headers);
    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = await getAccessToken();
        const refreshToken = await getRefreshToken();

        if (!token || !refreshToken) {
          throw new Error("No token");
        }

        console.log("🔄 REFRESH TOKEN...");

        const res = await api.post("/auth/refresh-token", {
          token,
          refreshToken,
        });

        const newToken = res.data.data.token;
        const newRefreshToken = res.data.data.refreshToken;

        await saveTokens({
          token: newToken,
          refreshToken: newRefreshToken,
        });

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await clearTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
