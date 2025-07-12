import api from "../api/api";

export const getCurrentUser = async () => {
  const response = await api.get("/account/me");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/account/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/account/profile", data);
  return response.data;
};


export const checkTokenValidity = async () => {
  try {
    const response = await api.get("/account/check-token");
    return response.data;
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    throw new Error("Token không hợp lệ");
  }
};
