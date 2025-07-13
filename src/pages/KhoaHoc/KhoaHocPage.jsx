import React from "react";
import { useNavigate } from "react-router";
import KhoaHocList from "../../components/KhoaHocList";
import "../css/KhoaHoc/KhoaHocPage.css";

const KhoaHocPage = () => {
  const navigate = useNavigate();

  return (
    <div className="khoahoc-page">
      <div className="khoahoc-content">
        {/* Header */}
        <div className="khoahoc-header">
          <div className="khoahoc-header-info">
            <div className="khoahoc-header-icon">📚</div>
            <div className="khoahoc-header-text">
              <h1>Quản lý Khóa học</h1>
            </div>
          </div>
          <button
            className="khoahoc-create-btn"
            onClick={() => navigate("/khoa-hoc/create")}
          >
            <span>➕</span>
            Tạo khóa học mới
          </button>
        </div>

        {/* Course List */}
        <div className="khoahoc-list-container">
          <KhoaHocList />
        </div>
      </div>
    </div>
  );
};

export default KhoaHocPage;
