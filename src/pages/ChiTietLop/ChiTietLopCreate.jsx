import React, { useEffect, useState } from "react";
import { createChiTietLop, getAllGiangVien } from "../../services/chiTietLopApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave, FaCalendarAlt, FaClock, FaChalkboardTeacher, FaSpinner, FaTimes, FaCheckCircle, FaPlus, FaGraduationCap } from "react-icons/fa";
import "../css/ChiTietLop/ChiTietLopCreate.css";

const ChiTietLopCreate = () => {
  const { lopId } = useParams();
  const [form, setForm] = useState({
    ngayHoc: new Date().toISOString().slice(0, 10),
    thoiGianBatDau: "07:00:00",
    thoiGianKetThuc: "11:00:00",
    lopId: parseInt(lopId),
    giangVienId: ""
  });
  const [giangViens, setGiangViens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllGiangVien();
        setGiangViens(data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsSubmitting(true);
    await createChiTietLop({
      ...form,
      giangVienId: form.giangVienId || null
    });
    setShowSuccess(true);

    setTimeout(() => {
      navigate(`/chi-tiet-lop/${lopId}`);
    }, 1500);
  } catch (error) {
    console.error("Error creating session:", error);
    alert("Có lỗi xảy ra khi tạo buổi học!");
  } finally {
    setIsSubmitting(false);
  }
};

  if (loading) {
    return (
      <div className="create-session-wrapper">
        <div className="create-session-loading">
          <div className="create-loading-card">
            <FaSpinner className="create-loading-icon" />
            <h3>Đang tải thông tin...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-session-wrapper">
      {/* Background Effects */}
      <div className="create-session-bg">
        <div className="create-bg-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`create-bg-dot dot-${i + 1}`}></div>
          ))}
        </div>
        <div className="create-bg-shapes">
          <div className="create-shape create-circle"></div>
          <div className="create-shape create-square"></div>
          <div className="create-shape create-hexagon"></div>
        </div>
      </div>

      <div className="create-session-container">
        {/* Header Section */}
        <div className="create-session-header">
          <div className="create-header-content">
            <button 
              className="create-back-button"
              onClick={() => navigate(`/chi-tiet-lop/${lopId}`)}
              type="button"
            >
              <FaArrowLeft />
            </button>
            <div className="create-header-info">
              <div className="create-header-icon">
                <FaGraduationCap />
              </div>
              <div className="create-header-text">
                <h1>Tạo Buổi Học Mới</h1>
                <p>Thêm buổi học cho lớp #{lopId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="create-session-main">
          <div className="create-form-wrapper">
            <div className="create-form-card">
              <div className="create-card-header">
                <div className="create-session-badge">
                  <FaPlus />
                </div>
                <div className="create-card-title">
                  <h3>Thông Tin Buổi Học</h3>                </div>
              </div>

              <form onSubmit={handleSubmit} className="create-session-form">
                <div className="create-form-grid">
                  {/* Date Input */}
                  <div className="create-input-section full-width">
                    <label className="create-input-label">
                      <FaCalendarAlt className="create-label-icon" />
                      <span>Ngày học</span>
                      <span className="create-required">*</span>
                    </label>
                    <div className="create-input-container">
                      <input 
                        type="date"
                        className="create-form-input"
                        name="ngayHoc"
                        value={form.ngayHoc}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Time Inputs */}
                  <div className="create-input-section">
                    <label className="create-input-label">
                      <FaClock className="create-label-icon" />
                      <span>Giờ bắt đầu</span>
                      <span className="create-required">*</span>
                    </label>
                    <div className="create-input-container">
                      <input 
                        type="time"
                        className="create-form-input"
                        name="thoiGianBatDau"
                        value={form.thoiGianBatDau}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="create-input-section">
                    <label className="create-input-label">
                      <FaClock className="create-label-icon" />
                      <span>Giờ kết thúc</span>
                      <span className="create-required">*</span>
                    </label>
                    <div className="create-input-container">
                      <input 
                        type="time"
                        className="create-form-input"
                        name="thoiGianKetThuc"
                        value={form.thoiGianKetThuc}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Instructor Selection */}
                  <div className="create-input-section full-width">
                    <label className="create-input-label">
                      <FaChalkboardTeacher className="create-label-icon instructor-icon" />
                      <span>Giảng viên</span>
                      <span className="create-required">*</span>
                    </label>
                    <div className="create-input-container">
                      <select 
                        className="create-form-select instructor-select"
                        name="giangVienId"
                        value={form.giangVienId}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        <option value="">-- Chọn giảng viên phụ trách --</option>
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
                <div className="create-form-actions">
                  <button 
                    type="button"
                    className="create-btn create-btn-cancel"
                    onClick={() => navigate(`/chi-tiet-lop/${lopId}`)}
                    disabled={isSubmitting}
                  >
                    <FaTimes />
                    <span>Hủy bỏ</span>
                  </button>
                  <button 
                    type="submit"
                    className="create-btn create-btn-save"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="create-spin" />
                        <span>Đang tạo...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Tạo buổi học</span>
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
          <div className="create-success-overlay">
            <div className="create-success-modal">
              <div className="create-success-icon">
                <FaCheckCircle />
              </div>
              <h3>Tạo buổi học thành công!</h3>
              <p>Buổi học đã được thêm vào lớp #{lopId}</p>
              <div className="create-success-progress">
                <div className="create-progress-bar"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChiTietLopCreate;