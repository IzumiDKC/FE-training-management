import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChiTietLopById } from "../../services/chiTietLopApi";
import { FaArrowLeft, FaEdit, FaCalendarAlt, FaClock, FaChalkboardTeacher, FaGraduationCap, FaSpinner, FaInfoCircle, FaUserCheck, FaEye } from "react-icons/fa";
import "./ChiTietLopDetail.css";
import useRole from "../../hooks/useRole";

const ChiTietLopDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const { isAdmin, isGiangVien } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    getChiTietLopById(id).then(setDetail);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString?.substring(0, 5) || "N/A";
  };

  const getSessionStatus = (ngayHoc, thoiGianKetThuc) => {
    const now = new Date();
    const sessionDate = new Date(ngayHoc);
    const [hours, minutes] = (thoiGianKetThuc || "00:00").split(':');
    sessionDate.setHours(parseInt(hours), parseInt(minutes));

    if (sessionDate > now) return 'upcoming';
    if (sessionDate.toDateString() === now.toDateString()) return 'ongoing';
    return 'completed';
  };

  if (!detail) {
    return (
      <div className="detail-session-wrapper">
        <div className="detail-session-loading">
          <div className="detail-loading-card">
            <FaSpinner className="detail-loading-icon" />
            <h3>Đang tải chi tiết buổi học...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  const status = getSessionStatus(detail.ngayHoc, detail.thoiGianKetThuc);

  return (
    <div className="detail-session-wrapper">
      {/* Background Effects */}
      <div className="detail-session-bg">
        <div className="detail-bg-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`detail-bg-dot dot-${i + 1}`}></div>
          ))}
        </div>
        <div className="detail-bg-shapes">
          <div className="detail-shape detail-circle"></div>
          <div className="detail-shape detail-square"></div>
          <div className="detail-shape detail-hexagon"></div>
        </div>
      </div>

      <div className="detail-session-container">
        {/* Header Section */}
        <div className="detail-session-header">
          <div className="detail-header-content">
            <button 
              className="detail-back-button"
              onClick={() => navigate(`/chi-tiet-lop/${detail.lopId}`)}
              type="button"
            >
              <FaArrowLeft />
            </button>
            <div className="detail-header-info">
              <div className="detail-header-icon">
                <FaEye />
              </div>
              <div className="detail-header-text">
                <h1>Chi Tiết Buổi Học</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="detail-session-main">
          <div className="detail-content-wrapper">
            {/* Session Info Card */}
            <div className="detail-info-card">
              <div className="detail-card-header">
                <div className="detail-session-badge">
                  <FaInfoCircle />
                </div>
                <div className="detail-card-title">
                      <div className="detail-card-heading">
                          <h3 className="title-text">Thông Tin Buổi Học</h3>
                      </div>
                      <div className={`detail-status-badge ${status}`}>
                        {status === 'completed' && 'Đã hoàn thành'}
                        {status === 'ongoing' && 'Đang diễn ra'}
                        {status === 'upcoming' && 'Sắp diễn ra'}
                      </div>
                </div>
              </div>

              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="detail-info-content">
                    <div className="detail-info-label">Ngày học</div>
                    <div className="detail-info-value">{formatDate(detail.ngayHoc)}</div>
                  </div>
                </div>

                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <FaClock />
                  </div>
                  <div className="detail-info-content">
                    <div className="detail-info-label">Giờ bắt đầu</div>
                    <div className="detail-info-value">{formatTime(detail.thoiGianBatDau)}</div>
                  </div>
                </div>

                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <FaClock />
                  </div>
                  <div className="detail-info-content">
                    <div className="detail-info-label">Giờ kết thúc</div>
                    <div className="detail-info-value">{formatTime(detail.thoiGianKetThuc)}</div>
                  </div>
                </div>

                <div className="detail-info-item">
                  <div className="detail-info-icon">
                    <FaChalkboardTeacher />
                  </div>
                  <div className="detail-info-content">
                    <div className="detail-info-label">Giảng viên</div>
                    <div className="detail-info-value">{detail.giangVienName || "Chưa phân công"}</div>
                  </div>
                </div>

                <div className="detail-info-item full-width">
                  <div className="detail-info-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="detail-info-content">
                    <div className="detail-info-label">Lớp học</div>
                    <div className="detail-info-value">{detail.tenLop}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="detail-actions-card">
              <div className="detail-actions-header">
                <h3>⚡ Thao Tác</h3>
              </div>
              <div className="detail-actions-content">
                {(isAdmin || isGiangVien) && (
                <button 
                  className="detail-action-btn edit"
                  onClick={() => navigate(`/chi-tiet-lop/edit/${detail.chiTietLopId}`)}
                >
                  <FaEdit />
                  <div className="detail-action-text">
                    <span className="detail-action-title">Chỉnh sửa</span>
                    <span className="detail-action-desc">Cập nhật thông tin buổi học</span>
                  </div>
                </button>
                )}
                {(isAdmin || isGiangVien) && (
                <button 
                  className="detail-action-btn attendance"
                  onClick={() => navigate(`/diem-danh/${detail.lopId}/${detail.chiTietLopId}`)}
                >
                  <FaUserCheck />
                  <div className="detail-action-text">
                    <span className="detail-action-title">Điểm danh</span>
                    <span className="detail-action-desc">Điểm danh học viên</span>
                  </div>
                </button>
                )}
                <button 
                  className="detail-action-btn back"
                  onClick={() => navigate(`/chi-tiet-lop/${detail.lopId}`)}
                >
                  <FaArrowLeft />
                  <div className="detail-action-text">
                    <span className="detail-action-title">Quay lại</span>
                    <span className="detail-action-desc">Trở về danh sách buổi học</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietLopDetail;