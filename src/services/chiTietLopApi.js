// File: src/services/chiTietLopApi.js
import api from "../config/api";

export const getChiTietLopsByLopId = async (lopId) => {
  const res = await api.get(`/ChiTietLop/lop/${lopId}`);
  return res.data;
};

export const getChiTietLopById = async (id) => {
  const res = await api.get(`/ChiTietLop/${id}`);
  return res.data;
};

export const createChiTietLop = async (data) => {
  const res = await api.post("/ChiTietLop", data);
  return res.data;
};

export const updateChiTietLop = async (id, data) => {
  const res = await api.put(`/ChiTietLop/${id}`, data);
  return res.data;
};

export const deleteChiTietLop = async (id) => {
  const res = await api.delete(`/ChiTietLop/${id}`);
  return res.data;
};

export const getAllGiangVien = async () => {
  const response = await api.get("/ChiTietLop/giangvien");
  return response.data;
};