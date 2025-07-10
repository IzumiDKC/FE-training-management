import api from "../api/api";

export const getAllDanhGia = async () => {
  const res = await api.get("/DanhGia");
  return res.data;
};

export const getDanhGiaTheoNam = async (nam) => {
  const res = await api.get(`/DanhGia/theo-nam?nam=${nam}`);
  return res.data;
};

export const createDanhGia = async (data) => {
  const res = await api.post("/DanhGia", data); // data: hocVienId, lopId, noiDung, diem
  return res.data;
};

export const deleteDanhGia = async (id) => {
  const res = await api.delete(`/DanhGia/${id}`);
  return res.data;
};
