import axios from "axios";
import { PEXELS_API_BASE_URL, PEXELS_API_KEY } from "./constants";

export const pexelsClient = axios.create({
  baseURL: PEXELS_API_BASE_URL,
  timeout: 10_000,
});

pexelsClient.interceptors.request.use((config) => {
  if (PEXELS_API_KEY) {
    config.headers.Authorization = PEXELS_API_KEY;
  }
  return config;
});

pexelsClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ??
      error?.message ??
      "Failed to reach the Pexels API";
    return Promise.reject(new Error(message));
  },
);
