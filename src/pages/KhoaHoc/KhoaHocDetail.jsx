// File: src/pages/KhoaHoc/KhoaHocDetail.jsx
import React, { useEffect, useState } from "react";
import { getKhoaHocById, deleteKhoaHoc } from "../../services/khoaHocApi";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaEdit, FaTrash, FaBook, FaGraduationCap, FaInfoCircle, FaIdCard, FaSpinner, FaExclamationTriangle} from "react-icons/fa";
import "../css/KhoaHoc/KhoaHocDetail.css";
import useRole from "../../hooks/useRole";
const KhoaHocDetail = () => {
  const { id } = useParams();
  const [khoaHoc, setKhoaHoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isAdmin, isGiangVien } = useRole();
  const navigate = useNavigate();


useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getKhoaHocById(id);
      setKhoaHoc(data);

    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      alert("Không thể tải thông tin khóa học");
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, [id]);


  const handleDelete = async () => {
    try {
      await deleteKhoaHoc(id);
      alert("✅ Xóa khóa học thành công!");
      navigate("/khoa-hoc");
    } catch (err) {
      alert("❌ Xóa thất bại!");
      console.error(err);
    }
    setShowDeleteModal(false);
  };


  if (loading) {
    return (
      <div className="khoahoc-detail-page">
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <p>Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  if (!khoaHoc) {
    return (
      <div className="khoahoc-detail-page">
        <div className="error-container">
          <FaExclamationTriangle className="error-icon" />
          <h3>Không tìm thấy thông tin</h3>
          <p>Khóa học với ID {id} không tồn tại</p>
          <button 
            className="btn-back-error"
            onClick={() => navigate("/khoa-hoc")}
          >
            <FaArrowLeft />
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="khoahoc-detail-page">
      {/* Educational Background */}
      <div className="khoahoc-detail-background"></div>

      <div className="khoahoc-detail-content">
        {/* Header */}
        <div className="detail-header">
          <div className="header-content">
            <button 
              className="back-button"
              onClick={() => navigate("/khoa-hoc")}
            >
              <FaArrowLeft />
            </button>
            <div className="header-info">
              <div className="header-text">
                <h1>Chi tiết khóa học</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container">
          {/* Main Info Card */}
          <div className="main-info-card">
            <div className="card-header">
              <div className="course-icon">
                <FaBook />
              </div>
              <div className="course-title">
                <h2>{khoaHoc.tenKhoaHoc}</h2>
                <div className="course-meta">
                  <span className="status-badge active">
                    Đang hoạt động
                  </span>
                </div>
              </div>
            </div>

            <div className="card-content">
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <FaIdCard />
                    Mã khóa học 
                  </div>
                  <div className="info-value">
                    <span className="id-badge">{khoaHoc.khoaHocId}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <FaBook />
                    Tên khóa học
                  </div>
                  <div className="info-value">
                    <span className="name-display">{khoaHoc.tenKhoaHoc}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <FaGraduationCap />
                    Chương trình đào tạo
                  </div>
                  <div className="info-value">
                    <span className="program-display">
                      {khoaHoc.chuongTrinhDaoTao?.tenChuongTrinh || "Chưa có"}
                    </span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <FaInfoCircle />
                    Trạng thái
                  </div>
                  <div className="info-value">
                    <span className="status-badge active">Đang hoạt động</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          {(isAdmin || isGiangVien) && (
          <div className="actions-card">
            <div className="actions-header">
              <h3>⚡ Thao tác</h3>
            </div>
            <div className="actions-content">
              {(isAdmin || isGiangVien) && (
              <button 
                className="action-button edit"
                onClick={() => navigate(`/khoa-hoc/edit/${id}`)}
              >
                <FaEdit />
                <div className="action-text">
                  <span className="action-title">Chỉnh sửa</span>
                  <span className="action-desc">Cập nhật thông tin khóa học</span>
                </div>
              </button>
              )}
              {isAdmin && (
              <button 
                className="action-button delete"
                onClick={() => setShowDeleteModal(true)}
              >
                <FaTrash />
                <div className="action-text">
                  <span className="action-title">Xóa khóa học</span>
                  <span className="action-desc">Xóa khóa học khỏi hệ thống</span>
                </div>
              </button>
              )}
            </div>
          </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h3>⚠️ Xác nhận xóa</h3>
            </div>
            <div className="modal-content">
              <p>Bạn có chắc chắn muốn xóa khóa học <strong>"{khoaHoc.tenKhoaHoc}"</strong>?</p>
              <p className="warning-text">Hành động này không thể hoàn tác!</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn-delete"
                onClick={handleDelete}
              >
                <FaTrash />
                Xóa khóa học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhoaHocDetail;
