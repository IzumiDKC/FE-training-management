// service/khoaHocApi.js
import api from "../api/api";


export const getAllKhoaHoc = async () => {
  const response = await api.get('/khoaHoc');
  return response.data;
};

export const getKhoaHocById = async (id) => {
  const response = await api.get(`/khoaHoc/${id}`);
  return response.data;
};

export const createKhoaHoc = async (data) => {
  const response = await api.post('/khoaHoc', data);
  return response.data;
};

export const updateKhoaHoc = async (id, data) => {
  await api.put(`/khoaHoc/${id}`, data);
};

export const deleteKhoaHoc = async (id) => {
  await api.delete(`/khoaHoc/${id}`);
};
