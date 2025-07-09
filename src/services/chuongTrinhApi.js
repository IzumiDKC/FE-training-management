import api from "../api/api";

export const getAllChuongTrinh = async () => {
  try {
    const res = await api.get("/ChuongTrinhDaoTao");
    console.log("Fetched data:", res.data);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error("Server responded with an error:", err.response.status, err.response.data);
    } else if (err.request) {
      console.error("Request was made but no response received:", err.request);
    } else {
      console.error("Other error:", err.message);
    }
    throw err;
  }
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
