import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { createChuongTrinh } from "../../services/chuongTrinhApi";
import { gsap } from "gsap";
import { FaSave,FaArrowLeft,FaEdit,FaFileAlt,FaTimes,FaRedo} from "react-icons/fa";
import "./ChuongTrinhCreate.css";

const ChuongTrinhCreate = () => {
  const [form, setForm] = useState({
    tenChuongTrinh: "",
    moTa: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(formRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.tenChuongTrinh.trim()) {
      newErrors.tenChuongTrinh = "Tên chương trình không được để trống";
    } else if (form.tenChuongTrinh.length < 3) {
      newErrors.tenChuongTrinh = "Tên chương trình phải có ít nhất 3 ký tự";
    }
    
    if (form.moTa && form.moTa.length > 500) {
      newErrors.moTa = "Mô tả không được quá 500 ký tự";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await createChuongTrinh(form);

      gsap.to(formRef.current, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        onComplete: () => {
          navigate("/chuong-trinh");
        }
      });
    } catch (error) {
      setErrors({ submit: "Lỗi khi tạo chương trình. Vui lòng thử lại!" });
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    gsap.to(containerRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => navigate("/chuong-trinh")
    });
  };

  const handleReset = () => {
    setForm({ tenChuongTrinh: "", moTa: "" });
    setErrors({});
  };

  return (
    <div className="chuong-trinh-create-page" ref={containerRef}>
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
      </div>

      {/* Content */}
      <div className="content-wrapper">
        {/* Header */}
        <div className="page-header">
          <div className="header-title">
            <h1>➕ Tạo Chương Trình Đào Tạo</h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card" ref={formRef}>
          <form onSubmit={handleSubmit}>
            {/* Form Section */}
            <div className="form-section">
              <div className="section-header">
                <FaEdit className="section-icon" />
                <h3 className="section-title">Thông tin chương trình</h3>
              </div>

              {/* Tên chương trình */}
              <div className="input-group">
                <label className="input-label">
                  <span>Tên chương trình</span>
                  <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input 
                    className={`form-input ${errors.tenChuongTrinh ? 'error' : ''}`}
                    name="tenChuongTrinh"
                    placeholder="Nhập tên chương trình..."
                    value={form.tenChuongTrinh}
                    onChange={handleChange}
                    required
                  />
                  <FaFileAlt className="input-icon" />
                </div>
                {errors.tenChuongTrinh && (
                  <span className="error-message">{errors.tenChuongTrinh}</span>
                )}
              </div>

              {/* Mô tả */}
              <div className="input-group">
                <label className="input-label">
                  <span>Mô tả chương trình</span>
                </label>
                <div className="input-wrapper">
                  <FaEdit className="input-icon" />
                  <textarea 
                    className={`form-textarea ${errors.moTa ? 'error' : ''}`}
                    name="moTa"
                    placeholder="Nhập mô tả chương trình..."
                    value={form.moTa}
                    onChange={handleChange}
                    rows={4}
                  />
                  <FaEdit className="input-icon-des" />
                </div>
                {errors.moTa && (
                  <span className="error-message">{errors.moTa}</span>
                )}
              </div>

              {/* Error Alert */}
              {errors.submit && (
                <div className="error-alert">
                  <FaTimes className="error-icon" />
                  <span>{errors.submit}</span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={isLoading}
              >
                <FaArrowLeft />
                <span>Quay lại</span>
              </button>
              
              <button 
                type="button"
                className="btn btn-reset"
                onClick={handleReset}
                disabled={isLoading}
              >
                <FaRedo />
                <span>Reset</span>
              </button>
              
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Đang tạo...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Tạo chương trình</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChuongTrinhCreate;