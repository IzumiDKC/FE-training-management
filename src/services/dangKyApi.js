// src/services/dangKyApi.js
import api from "../api/api";

export const getAllDangKy = async () => {
  const res = await api.get("/DangKyKhoaHoc");
  return res.data;
};

export const getAllKhoaHoc = async () => {
  const res = await api.get("/KhoaHoc");
  return res.data;
};

export const getLopByKhoaHoc = async (khoaHocId) => {
  const res = await api.get(`/DangKyKhoaHoc/LopByKhoaHoc?khoaHocId=${khoaHocId}`);
  return res.data;
};

export const createDangKy = async ({ khoaHocId, lopId }) => {
  const res = await api.post(`/DangKyKhoaHoc`, {
    khoaHocId,
    lopId,
  });
  return res.data;
};


