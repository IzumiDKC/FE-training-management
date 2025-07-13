import React, { useEffect, useState, useRef } from "react";
import { createLop } from "../../services/lopApi";
import { getAllKhoaHoc } from "../../services/khoaHocApi";
import { getAllLoaiLop } from "../../services/loaiLopApi";
import { useNavigate } from "react-router";
import { gsap } from "gsap";
import { 
  FaPlus, 
  FaSave, 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClock, 
  FaGraduationCap,
  FaUsers,
  FaEdit,
  FaCalculator,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import "../css/Lop/LopCreate.css";

const formatDateTimeLocal = (date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};

const LopCreate = () => {
  const defaultStart = new Date();
  defaultStart.setHours(7, 0, 0, 0);

  const defaultEnd = new Date(defaultStart.getTime() + 30 * 24 * 60 * 60 * 1000);
  defaultEnd.setHours(17, 0, 0, 0);

  const [form, setForm] = useState({
    tenLop: "",
    ngayBatDauDuKien: formatDateTimeLocal(defaultStart),
    ngayKetThucDuKien: formatDateTimeLocal(defaultEnd),
    soGio: 0,
    soGioQuyDoi: 0,
    coDanhSachHocVien: false,
    khoaHocId: "",
    loaiLopId: "",
  });

  const [khoaHocs, setKhoaHocs] = useState([]);
  const [loaiLops, setLoaiLops] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // GSAP refs
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    getAllKhoaHoc().then(setKhoaHocs);
    getAllLoaiLop().then(setLoaiLops);

    // Entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(".form-section",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const start = new Date(form.ngayBatDauDuKien);
    const end = new Date(form.ngayKetThucDuKien);
    if (end > start) {
      const hoursPerDay =
        end.getHours() + end.getMinutes() / 60 -
        (start.getHours() + start.getMinutes() / 60);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const total = hoursPerDay * days;
      setForm((prev) => ({ ...prev, soGio: total }));
    }
  }, [form.ngayBatDauDuKien, form.ngayKetThucDuKien]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.tenLop.trim()) {
      newErrors.tenLop = "Tên lớp không được để trống";
    }

    if (!form.khoaHocId) {
      newErrors.khoaHocId = "Vui lòng chọn khóa học";
    }

    if (!form.loaiLopId) {
      newErrors.loaiLopId = "Vui lòng chọn loại lớp";
    }

    const start = new Date(form.ngayBatDauDuKien);
    const end = new Date(form.ngayKetThucDuKien);
    if (end <= start) {
      newErrors.ngayKetThucDuKien = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    if (form.soGioQuyDoi <= 0) {
      newErrors.soGioQuyDoi = "Số giờ quy đổi phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsedValue =
      type === "checkbox"
        ? checked
        : name.includes("Id")
        ? parseInt(value) || ""
        : value;
    
    setForm({ ...form, [name]: parsedValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = document.querySelector('.input-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createLop(form);
      const id = response.lopId || response.id || response.LopId;
      
      // Success animation
      gsap.to(".form-container", {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        onComplete: () => {
          if (form.coDanhSachHocVien) {
            navigate(`/lop/chon-hoc-vien/${id}`);
          } else {
            navigate("/lop");
          }
        }
      });
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Lỗi khi tạo lớp học!" });
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    gsap.to(containerRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => navigate("/lop")
    });
  };

  return (
    <div className="create-class-container" ref={containerRef}>
      {/* Header */}
      <div className="create-header">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        
        <div className="header-title">
          <div className="title-icon">
            <FaPlus />
          </div>
          <div className="title-text">
            <h1>Tạo lớp học mới</h1>
            <p>Điền thông tin để tạo lớp học trong hệ thống</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container" ref={formRef}>
        <form onSubmit={handleSubmit} className="create-form">
          {/* Basic Information Section */}
          <div className="form-section">
            <div className="section-header">
              <FaEdit className="section-icon" />
              <h3>Thông tin cơ bản</h3>
            </div>
            
            <div className="input-group">
              <label className="input-label">
                <span>Tên lớp học</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-input ${errors.tenLop ? 'input-error' : ''}`}
                  name="tenLop"
                  value={form.tenLop}
                  onChange={handleChange}
                  placeholder="Nhập tên lớp học..."
                />
                <FaGraduationCap className="input-icon" />
              </div>
              {errors.tenLop && <span className="error-message">{errors.tenLop}</span>}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="form-section">
            <div className="section-header">
              <FaCalendarAlt className="section-icon" />
              <h3>Thời gian học</h3>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span>Ngày giờ bắt đầu</span>
                  <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="datetime-local"
                    className={`form-input ${errors.ngayBatDauDuKien ? 'input-error' : ''}`}
                    name="ngayBatDauDuKien"
                    value={form.ngayBatDauDuKien}
                    onChange={handleChange}
                  />
                  <FaCalendarAlt className="input-icon" />
                </div>
                {errors.ngayBatDauDuKien && <span className="error-message">{errors.ngayBatDauDuKien}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span>Ngày giờ kết thúc</span>
                  <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="datetime-local"
                    className={`form-input ${errors.ngayKetThucDuKien ? 'input-error' : ''}`}
                    name="ngayKetThucDuKien"
                    value={form.ngayKetThucDuKien}
                    onChange={handleChange}
                  />
                  <FaCalendarAlt className="input-icon" />
                </div>
                {errors.ngayKetThucDuKien && <span className="error-message">{errors.ngayKetThucDuKien}</span>}
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span>Số giờ (tự động tính)</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    className="form-input readonly"
                    value={form.soGio.toFixed(2)}
                    readOnly
                  />
                  <FaCalculator className="input-icon" />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span>Số giờ quy đổi</span>
                  <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    className={`form-input ${errors.soGioQuyDoi ? 'input-error' : ''}`}
                    name="soGioQuyDoi"
                    value={form.soGioQuyDoi}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="0.5"
                  />
                  <FaClock className="input-icon" />
                </div>
                {errors.soGioQuyDoi && <span className="error-message">{errors.soGioQuyDoi}</span>}
              </div>
            </div>
          </div>

          {/* Course Information Section */}
          <div className="form-section">
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h3>Thông tin khóa học</h3>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span>Khóa học</span>
                  <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    className={`form-select ${errors.khoaHocId ? 'input-error' : ''}`}
                    name="khoaHocId"
                    value={form.khoaHocId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn khóa học --</option>
                    {khoaHocs.map((kh) => (
                      <option key={kh.khoaHocId} value={kh.khoaHocId}>
                        {kh.tenKhoaHoc}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.khoaHocId && <span className="error-message">{errors.khoaHocId}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span>Loại lớp</span>
                  <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    className={`form-select ${errors.loaiLopId ? 'input-error' : ''}`}
                    name="loaiLopId"
                    value={form.loaiLopId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn loại lớp --</option>
                    {loaiLops.map((ll) => (
                      <option key={ll.loaiLopId} value={ll.loaiLopId}>
                        {ll.tenLoaiLop}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.loaiLopId && <span className="error-message">{errors.loaiLopId}</span>}
              </div>
            </div>
          </div>

          {/* Options Section */}
          <div className="form-section">
            <div className="section-header">
              <FaUsers className="section-icon" />
              <h3>Tùy chọn</h3>
            </div>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  name="coDanhSachHocVien"
                  checked={form.coDanhSachHocVien}
                  onChange={handleChange}
                />
                <span className="checkbox-custom">
                  <FaCheck className="check-icon" />
                </span>
                <div className="checkbox-text">
                  <span className="checkbox-title">Thêm học viên ngay sau khi tạo lớp</span>
                  <span className="checkbox-description">
                    Chuyển đến trang chọn học viên sau khi tạo lớp thành công
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="error-banner">
              <FaTimes className="error-icon" />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <FaTimes />
              <span>Hủy</span>
            </button>
            
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Tạo lớp học</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LopCreate;