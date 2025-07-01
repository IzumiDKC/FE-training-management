import api from "../api/api";

export const getCurrentUser = async () => {
  const response = await api.get("/account/me");
  return response.data;
};
