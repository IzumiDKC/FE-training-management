import api from "../api/api";

export const getThongKeTongQuan = async () => {
  const res = await api.get("/ThongKe/overview");
  return res.data;
};



export const getHocVienMoiTheoThang = async () => {
  const res = await api.get("/ThongKe/HocVienMoiTheoThang");
  return res.data;
};
