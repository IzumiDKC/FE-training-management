import React from "react";
import { Link } from "react-router";

const ServerError = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-warning">500</h1>
      <h2 className="mb-3">💥 Lỗi máy chủ</h2>
      <p className="lead">
        Đã xảy ra lỗi nội bộ trên hệ thống. Chúng tôi đang cố gắng khắc phục sớm nhất có thể.
      </p>
      <Link to="/" className="btn btn-outline-warning mt-3">
        🏠 Quay về trang chủ
      </Link>
    </div>
  );
};

export default ServerError;
