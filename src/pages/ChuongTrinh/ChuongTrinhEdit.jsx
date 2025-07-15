import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getChuongTrinhById, updateChuongTrinh } from "../../services/chuongTrinhApi";
import { FaArrowLeft, FaSave,FaGraduationCap,FaFileAlt,FaLightbulb,FaSpinner,FaTimes,FaCheckCircle} from "react-icons/fa";
import "../css/ChuongTrinh/ChuongTrinhEdit.css";

const ChuongTrinhEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ tenChuongTrinh: "", moTa: "" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getChuongTrinhById(id);
        setForm(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tenChuongTrinh.trim()) {
      alert("Vui lòng nhập tên chương trình");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateChuongTrinh(id, form);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate("/chuong-trinh");
      }, 1500);
    } catch (error) {
      console.error("Error updating:", error);
      alert("Có lỗi xảy ra khi cập nhật chương trình!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-program-container">
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
            <h3>Đang tải thông tin chương trình...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-program-container">
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
            onClick={() => navigate("/chuong-trinh")}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="header-text">
            <div className="title-section">
              <h1>Chỉnh sửa chương trình đào tạo</h1>            
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
                <FaGraduationCap />
              </div>
              <div className="card-title">
                <h3>Thông tin chương trình</h3>              </div>
            </div>

            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-section">
                <div className="input-group">
                  <label className="form-label">
                    <FaFileAlt />
                    Tên chương trình <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input 
                      className="form-input"
                      name="tenChuongTrinh"
                      value={form.tenChuongTrinh}
                      onChange={handleChange}
                      required 
                      placeholder="Nhập tên chương trình đào tạo..."
                      disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                  </div>
                  <div className="input-hint">
                    <FaLightbulb />
                    <span>Tên chương trình nên rõ ràng và thể hiện được mục tiêu đào tạo</span>
                  </div>
                </div>

                <div className="input-group">
                  <label className="form-label">
                    <FaFileAlt />
                    Mô tả chương trình
                  </label>
                  <div className="input-wrapper">
                    <textarea 
                      className="form-textarea"
                      name="moTa"
                      value={form.moTa}
                      onChange={handleChange}
                      placeholder="Nhập mô tả chi tiết về chương trình đào tạo..."
                      rows="5"
                      disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                  </div>
                  <div className="input-hint">
                    <FaLightbulb />
                    <span>Mô tả chi tiết sẽ giúp học viên hiểu rõ hơn về chương trình</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/chuong-trinh")}
                  disabled={isSubmitting}
                >
                  <FaTimes />
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="btn-update"
                  disabled={isSubmitting || !form.tenChuongTrinh.trim()}
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
            <p>Chương trình đào tạo đã được cập nhật</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChuongTrinhEdit;