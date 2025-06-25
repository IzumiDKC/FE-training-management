// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7247/api",
  withCredentials: true,
});

export default api;
