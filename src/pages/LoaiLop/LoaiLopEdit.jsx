import React, { useEffect, useState } from "react";
import { getLoaiLopById, updateLoaiLop } from "../../services/loaiLopApi";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaSave,FaGraduationCap,FaChalkboardTeacher,FaLightbulb,FaTimes,FaSpinner} from "react-icons/fa";
import "./LoaiLopEdit.css";

const LoaiLopEdit = () => {
  const { id } = useParams();
  const [tenLoaiLop, setTenLoaiLop] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getLoaiLopById(id);
        setTenLoaiLop(data.tenLoaiLop);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        alert("Không thể tải dữ liệu loại lớp");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenLoaiLop.trim()) {
      alert("Vui lòng nhập tên loại lớp");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updateLoaiLop(id, { loaiLopId: parseInt(id), tenLoaiLop });
      navigate("/loai-lop");
    } catch (error) {
      alert("Lỗi khi cập nhật");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-education-container">
        <div className="education-loading">
          <FaSpinner className="loading-spinner" />
          <p>Đang tải thông tin loại lớp...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-education-container">
      {/* Educational Background */}
      <div className="education-background">
        <div className="floating-elements">
          <div className="floating-shape shape-book"></div>
          <div className="floating-shape shape-graduation"></div>
          <div className="floating-shape shape-lightbulb"></div>
        </div>
        <div className="knowledge-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`knowledge-dot dot-${i % 3 + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="edit-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate("/loai-lop")}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="header-text">
            <div className="title-section">
              <h1>Cập nhật loại lớp</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="edit-content">
        <div className="form-container">
          {/* Form Card */}
          <div className="education-form-card">
            <div className="card-header">
              <div className="subject-icon">
                <FaGraduationCap />
              </div>
              <div className="card-title">
                <h3>Chỉnh sửa thông tin</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="education-form">
              <div className="form-section">
                <div className="input-group">
                  <label className="form-label">
                    <FaChalkboardTeacher />
                    Tên loại lớp <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input 
                      className="form-input"
                      value={tenLoaiLop} 
                      onChange={(e) => setTenLoaiLop(e.target.value)} 
                      required 
                      placeholder="Nhập tên loại lớp mới..."
                      disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                  </div>
                  <div className="input-hint">
                    <FaLightbulb />
                    <span>Cập nhật tên loại lớp để phân loại các khóa học phù hợp</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/loai-lop")}
                  disabled={isSubmitting}
                >
                  <FaTimes />
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="btn-update"
                  disabled={isSubmitting || !tenLoaiLop.trim()}
                >
                  <FaSave />
                  {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaiLopEdit;