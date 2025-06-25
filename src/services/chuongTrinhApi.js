import api from "../config/api";

export const getAllChuongTrinh = async () => {
  const res = await api.get('/ChuongTrinhDaoTao');
  return res.data;
};

export const getChuongTrinhById = async (id) => {
  const res = await api.get(`/ChuongTrinhDaoTao/${id}`);
  return res.data;
};

export const createChuongTrinh = async (data) => {
  const res = await api.post('/ChuongTrinhDaoTao', data);
  return res.data;
};

export const updateChuongTrinh = async (id, data) => {
  const res = await api.put(`/ChuongTrinhDaoTao/${id}`, data);
  return res.data;
};

export const deleteChuongTrinh = async (id) => {
  await api.delete(`/ChuongTrinhDaoTao/${id}`);
};
