import axios from "axios";
import Constants from "expo-constants";
import { getAccessToken } from "../utils/authStorage";

const API_URL = Constants.expoConfig.extra.API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    console.log("INTERCEPTOR TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("REQUEST HEADERS:", config.headers);

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
