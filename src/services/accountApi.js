import api from "../config/api";

export const getCurrentUser = async () => {
  const response = await api.get("/account/me");
  return response.data;
};
