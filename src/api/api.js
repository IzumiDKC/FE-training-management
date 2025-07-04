import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Token gửi đi:", config.headers["Authorization"]);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
