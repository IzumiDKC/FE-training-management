import api from "../api/api";

export const getAllLoaiLop = async () => {
  const response = await api.get("/LoaiLop");
  return response.data;
};

export const getLoaiLopById = async (id) => {
  const response = await api.get(`/LoaiLop/${id}`);
  return response.data;
};

export const createLoaiLop = async (data) => {
  const response = await api.post("/LoaiLop", data);
  return response.data;
};

export const updateLoaiLop = async (id, data) => {
  await api.put(`/LoaiLop/${id}`, data);
};

export const deleteLoaiLop = async (id) => {
  await api.delete(`/LoaiLop/${id}`);
};
