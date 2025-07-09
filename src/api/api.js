// src/services/api.js
import axios from "axios";
import { navigateTo } from "../utils/navigateService";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// Thêm token vào header nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Token gửi đi:", config.headers["Authorization"]);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Các path không cần login
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/confirm-email",
  "/resend-confirmation",
];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const currentPath = window.location.pathname;

      const isPublic = publicPaths.includes(currentPath);

      const errorPages = ["/unauthorized", "/forbidden", "/not-found", "/server-error"];
      const alreadyInErrorPage = errorPages.includes(currentPath);

      if (!alreadyInErrorPage) {
        if (status === 401 && !isPublic) {
          navigateTo("/unauthorized");
        } else if (status === 403) {
          navigateTo("/forbidden");
        } else if (status === 404) {
          navigateTo("/not-found");
        } else if (status >= 500) {
          navigateTo("/server-error");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
