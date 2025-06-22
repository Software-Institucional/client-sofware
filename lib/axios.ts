import axios from "axios";
import { refreshAccessToken } from "@/lib/auth";

const api = axios.create({
  baseURL: "https://api.eduadminsoft.shop",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false; // Flag to know if you are already trying to refresh the token
let failedQueue: any[] = []; // Queue of requests that failed while refreshing

/**
 * Execute the promises in the queue once the token refresh attempt has completed (or failed).
 * Completed (or failed) the attempt to refresh the token.
 Queue of requests that failed while refresh was being made.
*/
const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error); // Rejects the pledge if there was an error
    } else {
      prom.resolve(); // Resolves the promise if the refresh was successful
    }
  });

  // Clean the tail
  failedQueue = [];
};

// Axios response interceptor
api.interceptors.response.use(
  (response) => response, // Pass successful responses through as-is
  async (error) => {
    const originalRequest = error.config;

    // If response is 401 (Unauthorized) and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a token refresh is already in progress, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest)); // Retry the original request after refresh
      }

      // Mark the request as already retried to avoid infinite loops
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the access token
        const refreshed = await refreshAccessToken();

        if (refreshed) {
          // If refresh succeeded, process the queue and retry original request
          processQueue(null);
          return api(originalRequest);
        } else {
          // If refresh failed, reject all queued requests
          processQueue(new Error("Token refresh failed"));
          return Promise.reject(error);
        }
      } catch (err) {
        // If an error occurred during refresh, reject all queued requests
        processQueue(err);
        return Promise.reject(err);
      } finally {
        // Reset the refreshing flag
        isRefreshing = false;
      }
    }

    // For all other errors or already retried requests, reject as-is
    return Promise.reject(error);
  }
);

export default api;
