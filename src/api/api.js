import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// Thêm token vào request header nếu có
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

// Các path cho phép truy cập công khai
const publicPaths = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/confirm-email", "/resend-confirmation"];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const currentPath = window.location.pathname;
      const isPublic = publicPaths.includes(currentPath);

      if (status === 401 && !isPublic) {
        // Chuyển sang trang thông báo 401
        window.location.href = "/unauthorized";
      } else if (status === 403) {
        window.location.href = "/forbidden";
      } else if (status === 404) {
        window.location.href = "/404";
      } else if (status >= 500) {
        window.location.href = "/500";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
