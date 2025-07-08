const useRole = () => {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  return {
    roles,
    isAdmin: roles.includes("Admin"),
    isGiangVien: roles.includes("GiangVien"),
    isHocVien: roles.includes("HocVien"),
  };
};

export default useRole;
