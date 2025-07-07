import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger">403</h1>
      <h2 className="mb-3">🚫 Truy cập bị từ chối</h2>
      <p className="lead">
        Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản phù hợp hoặc liên hệ quản trị viên.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        🔙 Quay về trang chủ
      </Link>
    </div>
  );
};

export default Forbidden;
