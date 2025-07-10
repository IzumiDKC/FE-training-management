import api from "../api/api";

export const getAllDanhGiaTheoNam = async () => {
  const res = await api.get("/DanhGiaTheoNam");
  return res.data;
};

export const createDanhGiaTheoNam = async (data) => {
  const res = await api.post("/DanhGiaTheoNam", data); // data: hocVienId, nam, loaiDanhGia, noiDung
  return res.data;
};
