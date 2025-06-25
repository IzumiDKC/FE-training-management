// File: src/services/lopApi.js
import api from "../config/api";

export const getAllLop = async () => {
  const res = await api.get("/Lop");
  return res.data;
};

export const getLopById = async (id) => {
  const res = await api.get(`/Lop/${id}`);
  return res.data;
};

export const createLop = async (data) => {
  const res = await api.post("/Lop", data);
  return res.data;
};

export const updateLop = async (id, data) => {
  const res = await api.put(`/Lop/${id}`, data);
  return res.data;
};

export const deleteLop = async (id) => {
  await api.delete(`/Lop/${id}`);
};

export const getHocVienSelector = async (lopId) => {
  const res = await api.get(`/Lop/ChonHocVien/${lopId}`);
  return res.data;
};

export const themHocVienVaoLop = async (lopId, model) => {
  const response = await api.post(`/Lop/ThemHocVienVaoLop?lopId=${lopId}`, model);
  return response.data;
};
