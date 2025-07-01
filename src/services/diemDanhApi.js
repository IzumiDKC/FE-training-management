import api from "../api/api";

export const getDiemDanhByChiTietLopId = async (chiTietLopId) => {
  try {
    const response = await api.get(`/DiemDanh/GetDiemDanhByChiTietLopId/${chiTietLopId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diem danh", error);
    throw error;
  }
};


export const resetAllCheckIn = async (chiTietLopId) => {
  try {
    await api.post("/DiemDanh/ResetAllCheckIn", { chiTietLopId }); 
  } catch (error) {
    console.error("Error resetting check-in", error);
    throw error;
  }
};

export const resetAllCheckOut = async (chiTietLopId) => {
  try {
    await api.post("/DiemDanh/ResetAllCheckOut", { chiTietLopId });  // Use api instance and send chiTietLopId in body
  } catch (error) {
    console.error("Error resetting check-out", error);
    throw error;
  }
};
