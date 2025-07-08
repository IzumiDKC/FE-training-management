const useRole = () => {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  return {
    roles,
    isAuthenticated: roles.length > 0,
    isAdmin: roles.includes("Admin"),
    isGiangVien: roles.includes("GiangVien"),
    isHocVien: roles.includes("HocVien"),
  };
};

export default useRole;
