import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/accountApi";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        setError("Không thể tải thông tin. Có thể bạn chưa đăng nhập.");
      });
  }, []);

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!user) return <div className="text-center mt-5">🔄 Đang tải...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4">
        <h3 className="text-primary mb-4">👤 Thông tin cá nhân</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>Họ tên:</strong> <div>{user.hoTen}</div>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Email:</strong> <div>{user.email}</div>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Số căn cước:</strong> <div>{user.soCanCuoc}</div>
          </div>
<div className="col-md-6 mb-3">
  <strong>Vai trò:</strong>
<div>{Array.isArray(user.roles) ? user.roles.join(", ") : "Chưa có"}</div>
</div>

        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
