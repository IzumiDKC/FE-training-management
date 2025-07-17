import React, { useEffect, useState } from "react";
import { createKhoaHoc } from "../../services/khoaHocApi";
import api from "../../api/api";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaSave,FaBook,FaGraduationCap,FaSpinner,FaCheckCircle,FaExclamationCircle,FaInfoCircle} from "react-icons/fa";
import "./KhoaHocCreate.css";

const KhoaHocCreate = () => {
  const [form, setForm] = useState({
    tenKhoaHoc: "",
    chuongTrinhDaoTaoId: "",
  });

  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChuongTrinh = async () => {
      try {
        const response = await api.get("/ChuongTrinhDaoTao");
        setChuongTrinhList(response.data);
      } catch (error) {
        console.error("Lỗi khi load chương trình đào tạo", error);
      }
    };

    fetchChuongTrinh();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.tenKhoaHoc.trim()) {
      newErrors.tenKhoaHoc = "Tên khóa học không được để trống";
    } else if (form.tenKhoaHoc.length < 3) {
      newErrors.tenKhoaHoc = "Tên khóa học phải có ít nhất 3 ký tự";
    }

    if (!form.chuongTrinhDaoTaoId) {
      newErrors.chuongTrinhDaoTaoId = "Vui lòng chọn chương trình đào tạo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name.includes("Id") ? parseInt(value) || "" : value;
    setForm((prev) => ({ ...prev, [name]: parsedValue }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createKhoaHoc(form);
      alert("✅ Tạo khóa học thành công!");
      navigate("/khoa-hoc");
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error);
      alert("❌ Có lỗi xảy ra khi tạo khóa học!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedProgram = () => {
    return chuongTrinhList.find(ct => ct.chuongTrinhDaoTaoId === form.chuongTrinhDaoTaoId);
  };

  return (
    <div className="khoahoc-create-page">
      {/* Educational Background */}
      <div className="khoahoc-create-background"></div>
      <div className="khoahoc-create-content">
        {/* Header */}
        <div className="header-bar">
          <div className="header-left">
            <button className="back-button" onClick={() => navigate("/khoa-hoc")}>
              <FaArrowLeft />
            </button>
            <h1 className="page-title">Tạo khóa học mới</h1>
          </div>
        </div>
        <div className="form-container">
          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div className="progress-step active">
              <FaBook />
              <span>Thông tin cơ bản</span>
            </div>
            <div className={`progress-step ${showPreview ? 'active' : ''}`}>
              <FaCheckCircle />
              <span>Xem trước</span>
            </div>
          </div>

          {!showPreview ? (
            <div className="form-card">
              <div className="form-header">
                <h2>📝 Thông tin khóa học</h2>
                <button 
                  type="button"
                  className="preview-btn"
                  onClick={() => setShowPreview(true)}
                  disabled={!form.tenKhoaHoc || !form.chuongTrinhDaoTaoId}
                >
                  👁️ Xem trước
                </button>
              </div>

              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-grid">
                  {/* Course Name */}
                  <div className="form-group">
                    <label className="form-label">
                      <FaBook />
                      Tên khóa học
                    </label>
                    <input
                      type="text"
                      name="tenKhoaHoc"
                      value={form.tenKhoaHoc}
                      onChange={handleChange}
                      className={`form-input ${errors.tenKhoaHoc ? 'error' : ''}`}
                      placeholder="Nhập tên khóa học..."
                    />
                    {errors.tenKhoaHoc && (
                      <span className="error-message">
                        <FaExclamationCircle /> {errors.tenKhoaHoc}
                      </span>
                    )}
                  </div>

                  {/* Training Program */}
                  <div className="form-group">
                    <label className="form-label">
                      <FaGraduationCap />
                      Chương trình đào tạo
                    </label>
                    <div className="select-container">
                      <select
                        name="chuongTrinhDaoTaoId"
                        value={form.chuongTrinhDaoTaoId}
                        onChange={handleChange}
                        className={`form-select ${errors.chuongTrinhDaoTaoId ? 'error' : ''}`}
                      >
                        <option value="">-- Chọn chương trình đào tạo --</option>
                        {chuongTrinhList.map((ct) => (
                          <option key={ct.chuongTrinhDaoTaoId} value={ct.chuongTrinhDaoTaoId}>
                            {ct.tenChuongTrinh}
                          </option>
                        ))}
                      </select>

                    </div>
                    {errors.chuongTrinhDaoTaoId && (
                      <span className="error-message">
                        <FaExclamationCircle /> {errors.chuongTrinhDaoTaoId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate("/khoa-hoc")}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="spinning" />
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Tạo khóa học
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="preview-card">
              <div className="preview-header">
                <h2>👁️ Xem trước khóa học</h2>
                <button 
                  type="button"
                  className="edit-btn"
                  onClick={() => setShowPreview(false)}
                >
                  ✏️ Chỉnh sửa
                </button>
              </div>

              <div className="preview-content">
                <div className="preview-course-card">
                  <div className="preview-course-header">
                    <div className="preview-course-icon">📚</div>
                    <div className="preview-course-status">
                      <span className="status-new">Mới</span>
                    </div>
                  </div>
                  
                  <div className="preview-course-body">
                    <h3>{form.tenKhoaHoc || "Tên khóa học"}</h3>
                    
                    <div className="preview-course-info">
                      <div className="preview-info-item">
                        <span className="info-label">🎓 Chương trình:</span>
                        <span className="info-value">
                          {getSelectedProgram()?.tenChuongTrinh || "Chưa chọn"}
                        </span>
                      </div>
                      <div className="preview-info-item">
                        <span className="info-label">📅 Trạng thái:</span>
                        <span className="info-value">Chuẩn bị khởi tạo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                {getSelectedProgram() && (
                  <div className="program-details">
                    <h4><FaInfoCircle /> Chi tiết chương trình</h4>
                    <div className="program-info">
                      <div className="program-item">
                        <strong>Tên chương trình:</strong> {getSelectedProgram().tenChuongTrinh}
                      </div>
                      <div className="program-item">
                        <strong>Mã chương trình:</strong> {getSelectedProgram().chuongTrinhDaoTaoId}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="preview-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/khoa-hoc")}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="spinning" />
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Xác nhận tạo
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KhoaHocCreate;
