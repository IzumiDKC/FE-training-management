// src/services/api.js
import axios from "axios";

// const api = axios.create({
//   baseURL: "https://localhost:7247/api",
//   withCredentials: true,
// });
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);
export default api;
