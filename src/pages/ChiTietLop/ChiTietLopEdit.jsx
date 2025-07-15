import React, { useEffect, useState } from "react";
import { getChiTietLopById, updateChiTietLop, getAllGiangVien } from "../../services/chiTietLopApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave, FaCalendarAlt, FaClock, FaChalkboardTeacher, FaSpinner, FaTimes, FaCheckCircle, FaEdit } from "react-icons/fa";
import "../css/ChiTietLop/ChiTietLopEdit.css";

const ChiTietLopEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [giangViens, setGiangViens] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getChiTietLopById(id).then(setForm);
    getAllGiangVien().then(setGiangViens);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "giangVienId" && value === "" ? null : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateChiTietLop(id, form);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate(`/chi-tiet-lop/${form.lopId}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating session:", error);
      alert("Có lỗi xảy ra khi cập nhật buổi học!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form) {
    return (
      <div className="edit-session-wrapper">
        <div className="edit-session-loading">
          <div className="edit-loading-card">
            <FaSpinner className="edit-loading-icon" />
            <h3>🔄 Đang tải thông tin...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-session-wrapper">
      {/* Background Effects */}
      <div className="edit-session-bg">
        <div className="edit-bg-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`edit-bg-dot dot-${i + 1}`}></div>
          ))}
        </div>
        <div className="edit-bg-shapes">
          <div className="edit-shape edit-circle"></div>
          <div className="edit-shape edit-square"></div>
          <div className="edit-shape edit-hexagon"></div>
        </div>
      </div>

      <div className="edit-session-container">
        {/* Header Section */}
        <div className="edit-session-header">
          <div className="edit-header-content">
            <button 
              className="edit-back-button"
              onClick={() => navigate(`/chi-tiet-lop/${form.lopId}`)}
              type="button"
            >
              <FaArrowLeft />
            </button>
            <div className="edit-header-info">
              <div className="edit-header-icon">
                <FaEdit />
              </div>
              <div className="edit-header-text">
                <h1>Cập Nhật Buổi Học</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="edit-session-main">
          <div className="edit-form-wrapper">
            <div className="edit-form-card">
              <div className="edit-card-header">
                <div className="edit-session-badge">
                  <FaEdit />
                </div>
                <div className="edit-card-title">
                  <h3>Thông Tin Buổi Học</h3>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="edit-session-form">
                <div className="edit-form-grid">
                  {/* Date Input */}
                  <div className="edit-input-section full-width">
                    <label className="edit-input-label">
                      <FaCalendarAlt className="edit-label-icon" />
                      <span>Ngày học</span>
                      <span className="edit-required">*</span>
                    </label>
                    <div className="edit-input-container">
                      <input 
                        type="date"
                        className="edit-form-input"
                        name="ngayHoc"
                        value={form.ngayHoc?.substring(0, 10)}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Time Inputs */}
                  <div className="edit-input-section">
                    <label className="edit-input-label">
                      <FaClock className="edit-label-icon" />
                      <span>Giờ bắt đầu</span>
                      <span className="edit-required">*</span>
                    </label>
                    <div className="edit-input-container">
                      <input 
                        type="time"
                        className="edit-form-input"
                        name="thoiGianBatDau"
                        value={form.thoiGianBatDau}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="edit-input-section">
                    <label className="edit-input-label">
                      <FaClock className="edit-label-icon" />
                      <span>Giờ kết thúc</span>
                      <span className="edit-required">*</span>
                    </label>
                    <div className="edit-input-container">
                      <input 
                        type="time"
                        className="edit-form-input"
                        name="thoiGianKetThuc"
                        value={form.thoiGianKetThuc}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Instructor Selection */}
                  <div className="edit-input-section full-width">
                    <label className="edit-input-label">
                      <FaChalkboardTeacher className="edit-label-icon instructor-icon" />
                      <span>Giảng viên</span>
                      <span className="edit-optional">(tùy chọn)</span>
                    </label>
                    <div className="edit-input-container">
                      <select 
                        className="edit-form-select instructor-select"
                        name="giangVienId"
                        value={form.giangVienId || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      > 
                        <option value="">-- Không chọn giảng viên --</option>
                        {giangViens.map(gv => (
                          <option key={gv.giangVienId} value={gv.giangVienId}>
                            {gv.hoTen}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="edit-form-actions">
                  <button 
                    type="button"
                    className="edit-btn edit-btn-cancel"
                    onClick={() => navigate(`/chi-tiet-lop/${form.lopId}`)}
                    disabled={isSubmitting}
                  >
                    <FaTimes />
                    <span>Hủy bỏ</span>
                  </button>
                  <button 
                    type="submit"
                    className="edit-btn edit-btn-save"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="edit-spin" />
                        <span>Đang cập nhật...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Cập nhật</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="edit-success-overlay">
            <div className="edit-success-modal">
              <div className="edit-success-icon">
                <FaCheckCircle />
              </div>
              <h3>Cập nhật thành công!</h3>
              <p>Thông tin buổi học đã được cập nhật</p>
              <div className="edit-success-progress">
                <div className="edit-progress-bar"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChiTietLopEdit;
