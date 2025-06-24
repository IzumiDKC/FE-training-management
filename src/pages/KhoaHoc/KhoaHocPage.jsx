import React from "react";
import { useNavigate } from "react-router-dom";
import KhoaHocList from "../../components/KhoaHocList";

const KhoaHocPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📘 Danh sách Khóa học</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/khoa-hoc/create")}
        >
          ➕ Tạo mới
        </button>
      </div>
      <KhoaHocList />
    </div>
  );
};

export default KhoaHocPage;
