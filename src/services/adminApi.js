import api from "../api/api";

export const getAllUsersWithRoles = () => {
  return api.get("/Admin/Users");
};

export const changeUserRole = (userId) => {
  return api.post(`/Admin/ChangeRole/${userId}`);
};

export const getPagedUsers = (page = 1, pageSize = 10) => {
  return api.get(`/Admin/Users?page=${page}&pageSize=${pageSize}`);
};

