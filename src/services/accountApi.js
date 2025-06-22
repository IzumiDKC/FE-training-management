import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7247/api",
  withCredentials: true,
});

export const getCurrentUser = async () => {
  const response = await api.get("/account/me");
  return response.data;
};
