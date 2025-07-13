// File: src/pages/KhoaHoc/KhoaHocDetail.jsx
import React, { useEffect, useState } from "react";
import { getKhoaHocById, deleteKhoaHoc } from "../../services/khoaHocApi";
import { getAllDangKy } from "../../services/dangKyApi";
import { useParams, useNavigate } from "react-router";
import { 
  FaArrowLeft, 
  FaEdit,
  FaTrash,
  FaBook,
  FaGraduationCap,
  FaInfoCircle,
  FaIdCard,
  FaSpinner,
  FaExclamationTriangle,
  FaUsers,
  FaChartLine,
  FaCopy,
  FaShare,
  FaCalendarAlt
} from "react-icons/fa";
import "../css/KhoaHoc/KhoaHocDetail.css";

const KhoaHocDetail = () => {
  const { id } = useParams();
  const [khoaHoc, setKhoaHoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [soHocVien, setSoHocVien] = useState(0);
  const [tongDangKy, setTongDangKy] = useState(0);


useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getKhoaHocById(id);
      setKhoaHoc(data);

      const allDangKy = await getAllDangKy();
      const filtered = allDangKy.filter(dk => dk.tenKhoaHoc === data.tenKhoaHoc);
      setTongDangKy(filtered.length);
      const uniqueTenHocVien = new Set(filtered.map(dk => dk.tenHocVien));
      setSoHocVien(uniqueTenHocVien.size);

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("📋 Đã sao chép vào clipboard!");
  };

  const shareLink = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `Khóa học: ${khoaHoc.tenKhoaHoc}`,
        url: url
      });
    } else {
      copyToClipboard(url);
    }
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
              <div className="header-icon">
                <FaBook />
              </div>
              <div className="header-text">
                <h1>Chi tiết khóa học</h1>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="action-btn share"
                onClick={shareLink}
                title="Chia sẻ"
              >
                <FaShare />
              </button>
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
                  <span className="course-id">ID: {khoaHoc.khoaHocId}</span>
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
                    <FaCalendarAlt />
                    Ngày tạo
                  </div>
                  <div className="info-value">
                    <span className="date-display">
                      {new Date().toLocaleDateString('vi-VN')}
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

          <div className="stats-section">
            <div className="stats-card">
              <div className="stat-icon" style={{ backgroundColor: "#DBEAFE" }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 640 512" fill="#3B82F6">
                  <path d="M96 128a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm0 32c-53 0-96 43-96 96v32c0 18 14 32 32 32h128c18 0 32-14 32-32v-32c0-53-43-96-96-96zM320 128a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-11 0-22 2-32 5 20 21 32 49 32 79v32c0 11-2 21-5 31h101c18 0 32-14 32-32v-32c0-53-43-96-96-96zm192-32a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm64 32c-21 0-40 6-56 17 18 22 28 49 28 79v32c0 11-2 21-5 31h85c18 0 32-14 32-32v-32c0-53-43-96-96-96z"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{soHocVien}</div>
                <div className="stat-label">Học viên đăng ký</div>
              </div>
            </div>

            <div className="stats-card">
              <div className="stat-icon" style={{ backgroundColor: "#D1FAE5" }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512" fill="#10B981">
                  <path d="M64 32C46.3 32 32 46.3 32 64V416c0 17.7 14.3 32 32 32H320V448H64V64H448v96h32V64c0-17.7-14.3-32-32-32H64zM320 384h32V224H320V384zm64 0h32V160H384V384zm64 0h32V288H448V384z" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{tongDangKy}</div>
                <div className="stat-label">Tổng đăng ký</div>
              </div>
            </div>
          </div>

          <div className="actions-card">
            <div className="actions-header">
              <h3>⚡ Thao tác</h3>
            </div>
            <div className="actions-content">
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
            </div>
          </div>
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
