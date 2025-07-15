import React, { useEffect, useState } from "react";
import { getLopById, updateLop } from "../../services/lopApi";
import { useParams, useNavigate } from "react-router";
import { 
  FaArrowLeft, 
  FaSave,
  FaUsers,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
  FaBook,
  FaClock,
  FaCalendarAlt,
  FaGraduationCap
} from "react-icons/fa";

import "../css/Lop/LopEdit.css";
const LopEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getLopById(id);
        setForm(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tenLop.trim()) {
      alert("Vui lòng nhập tên lớp");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateLop(id, form);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate("/lop");
      }, 1500);
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Có lỗi xảy ra khi cập nhật lớp học!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-lop-container">
        <div className="edit-background">
          <div className="edit-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="edit-dot"></div>
            ))}
          </div>
        </div>

        <div className="edit-loading">
          <div className="loading-content">
            <div className="loading-icon">
              <FaSpinner className="spinner-icon" />
            </div>
            <h3>Đang tải thông tin lớp học...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="edit-lop-container">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              <FaTimes />
            </div>
            <h3>Không tìm thấy thông tin lớp học</h3>
            <p>Lớp học với ID {id} không tồn tại</p>
            <button 
              className="btn-back-error"
              onClick={() => navigate("/lop")}
            >
              <FaArrowLeft />
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-lop-container">
      {/* Background Effects */}
      <div className="edit-background">
        <div className="edit-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="edit-dot"></div>
          ))}
        </div>
        <div className="edit-shapes">
          <div className="edit-shape shape-circle"></div>
          <div className="edit-shape shape-square"></div>
          <div className="edit-shape shape-triangle"></div>
          <div className="edit-shape shape-hexagon"></div>
        </div>
      </div>

      {/* Header */}
      <div className="edit-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate("/lop")}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="header-text">
            <div className="title-section">
              <h1>Chỉnh sửa lớp học</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="edit-content">
        <div className="form-container">
          {/* Form Card */}
          <div className="edit-form-card">
            <div className="card-header">
              <div className="subject-icon">
                <FaUsers />
              </div>
              <div className="card-title">
                <h3>Thông tin lớp học</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-section">
                <div className="input-group">
                  <label className="form-label">
                    <FaUsers />
                    Tên lớp <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input 
                      className="form-input"
                      name="tenLop"
                      value={form.tenLop || ""}
                      onChange={handleChange}
                      required 
                      placeholder="Nhập tên lớp học..."
                      disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                  </div>
                  <div className="input-hint">
                    <FaBook />
                    <span>Tên lớp học nên rõ ràng và dễ nhận biết</span>
                  </div>
                </div>

                {/* Additional Fields Display */}
                <div className="info-display">
                  <div className="info-row">
                    <div className="info-label">
                      <FaBook />
                      Khóa học
                    </div>
                    <div className="info-value">
                      {form.khoaHocName || "Chưa có thông tin"}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FaGraduationCap />
                      Loại lớp
                    </div>
                    <div className="info-value">
                      {form.loaiLopName || "Chưa có thông tin"}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FaClock />
                      Số giờ học
                    </div>
                    <div className="info-value">
                      {form.soGio} giờ ({form.soGioQuyDoi} giờ quy đổi)
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FaCalendarAlt />
                      Thời gian học
                    </div>
                    <div className="info-value">
                      {form.ngayBatDauDuKien && form.ngayKetThucDuKien ? 
                        `${new Date(form.ngayBatDauDuKien).toLocaleDateString('vi-VN')} - ${new Date(form.ngayKetThucDuKien).toLocaleDateString('vi-VN')}` :
                        "Chưa có thông tin"
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/lop")}
                  disabled={isSubmitting}
                >
                  <FaTimes />
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="btn-update"
                  disabled={isSubmitting || !form.tenLop?.trim()}
                >
                  {isSubmitting ? <FaSpinner className="spin" /> : <FaSave />}
                  {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h3>Cập nhật thành công!</h3>
            <p>Thông tin lớp học đã được cập nhật</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LopEdit;