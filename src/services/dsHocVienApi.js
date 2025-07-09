import api from "../api/api";

export const getDsHocVienByLopId = async (lopId) => {
  try {
    const response = await api.get(`/DanhSachHocVien/GetByLopId/${lopId}`);
    if (response.data.length === 0) {
      return { message: "Chưa có học viên cho lớp học này" }; 
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { message: "Không có học viên cho lớp học này" };
    }
    console.error("Error fetching danh sach hoc vien", error);
    throw error;
  }
};


export const addDsHocVienToLop = async (dto) => {
  try {
    const response = await api.post("/DanhSachHocVien/AddHocVienToLop", dto);
    return response.data;
  } catch (error) {
    console.error("Error adding hoc vien to lop", error);
    throw error;
  }
};

export const updateDsHocVien = async (id, dto) => {
  try {
    const response = await api.put(`/DanhSachHocVien/UpdateDanhSachHocVien/${id}`, dto);
    return response.data;
  } catch (error) {
    console.error("Error updating danh sach hoc vien", error);
    throw error;
  }
};

export const deleteDsHocVien = async (id) => {
  try {
    const response = await api.delete(`/DanhSachHocVien/DeleteDanhSachHocVien/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting danh sach hoc vien", error);
    throw error;
  }
};
