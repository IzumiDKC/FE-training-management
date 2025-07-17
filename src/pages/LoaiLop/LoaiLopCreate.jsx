import React, { useState } from "react";
import { createLoaiLop } from "../../services/loaiLopApi";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaSave,FaBook,FaChalkboardTeacher,FaLightbulb,FaTimes} from "react-icons/fa";
import "./LoaiLopCreate.css";

const LoaiLopCreate = () => {
  const [tenLoaiLop, setTenLoaiLop] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenLoaiLop.trim()) {
      alert("Vui lòng nhập tên loại lớp");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createLoaiLop({ tenLoaiLop });
      navigate("/loai-lop");
    } catch (error) {
      alert("Lỗi khi tạo loại lớp");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-education-container">
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
      <div className="create-header">
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
              <h1>Tạo loại lớp mới</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="create-content">
        <div className="form-container">
          {/* Form Card */}
          <div className="education-form-card">
            <div className="card-header">
              <div className="subject-icon">
                <FaBook />
              </div>
              <div className="card-title">
                <h3>Thông tin loại lớp</h3>              </div>
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
                      placeholder="Nhập tên loại lớp (VD: Lập trình, Thiết kế, Marketing...)"
                      disabled={isSubmitting}
                    />
                    <div className="input-border"></div>
                  </div>
                  <div className="input-hint">
                    <FaLightbulb />
                    <span>Tên loại lớp nên rõ ràng và dễ hiểu để phân loại các khóa học</span>
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
                  className="btn-save"
                  disabled={isSubmitting || !tenLoaiLop.trim()}
                >
                  <FaSave />
                  {isSubmitting ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default LoaiLopCreate;