// src/pages/DangKyKhoaHoc/DangKyKhoaHocCreate.jsx
import React, { useEffect, useState } from "react";
import { getAllKhoaHoc, getLopByKhoaHoc, createDangKy } from "../../services/dangKyApi";
import { useNavigate } from "react-router";
import "../css/DangKyKhoaHoc/DangKyKhoaHocCreate.css";

const DangKyKhoaHocCreate = () => {
  const [khoaHocs, setKhoaHocs] = useState([]);
  const [lops, setLops] = useState([]);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState("");
  const [selectedLop, setSelectedLop] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllKhoaHoc().then(setKhoaHocs);
  }, []);

  useEffect(() => {
    if (selectedKhoaHoc) {
      getLopByKhoaHoc(selectedKhoaHoc).then(setLops);
      setSelectedLop(""); // Reset lớp khi đổi khóa học
    } else {
      setLops([]);
    }
  }, [selectedKhoaHoc]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedKhoaHocId = parseInt(selectedKhoaHoc);
    const parsedLopId = parseInt(selectedLop);

    if (isNaN(parsedKhoaHocId) || isNaN(parsedLopId)) {
      alert("Vui lòng chọn khóa học và lớp hợp lệ.");
      return;
    }

    const payload = {
      khoaHocId: parsedKhoaHocId,
      lopId: parsedLopId,
    };

    setIsLoading(true);
    try {
      await createDangKy(payload);
      alert("✅ Đăng ký thành công!");
      navigate("/");
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      alert("Đăng ký thất bại: " + (err?.response?.data || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getStepStatus = (stepNumber) => {
    const currentStep = getCurrentStep();
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return '';
  };

  const getCurrentStep = () => {
    if (!selectedKhoaHoc) return 1;
    if (!selectedLop) return 2;
    return 3;
  };

  return (
    <div className="dangky-registration-page">
      {/* Animated Background */}
      <div className="dangky-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="dangky-particle"></div>
        ))}
      </div>

      <div className="dangky-geo-shapes">
        <div className="dangky-triangle"></div>
        <div className="dangky-circle"></div>
        <div className="dangky-square"></div>
      </div>

      <div className="dangky-registration-content">
        {/* Header */}
        <div className="dangky-page-header">
          <div className="dangky-header-icon">✏️</div>
          <h1 className="dangky-page-title">Đăng Ký Khóa Học</h1>
          <p className="dangky-page-subtitle">Chọn khóa học và lớp học phù hợp với bạn</p>
        </div>

        {/* Registration Card */}
        <div className="dangky-registration-card">
          <div className="dangky-card-content">
            {/* Progress Steps */}
            <div className="dangky-form-steps">
              <div className={`dangky-step-item ${getStepStatus(1)}`}>
                {getStepStatus(1) === 'completed' ? '✓' : '1'}
              </div>
              <div className={`dangky-step-item ${getStepStatus(2)}`}>
                {getStepStatus(2) === 'completed' ? '✓' : '2'}
              </div>
              <div className={`dangky-step-item ${getStepStatus(3)}`}>
                {getStepStatus(3) === 'completed' ? '✓' : '3'}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Course Selection */}
              <div className="dangky-form-group">
                <label className="dangky-form-label">
                  Khóa học
                </label>
                <div className="dangky-select-container">
                  <select
                    className="dangky-form-select"
                    value={selectedKhoaHoc}
                    onChange={(e) => setSelectedKhoaHoc(e.target.value)}
                    required
                  >
                    <option value="">Chọn khóa học...</option>
                    {khoaHocs.map((k) => (
                      <option key={k.khoaHocId} value={k.khoaHocId}>
                        {k.tenKhoaHoc}
                      </option>
                    ))}
                  </select>
                  <div className="dangky-select-arrow">▼</div>
                </div>
              </div>

              {/* Class Selection */}
              <div className="dangky-form-group">
                <label className="dangky-form-label">
                  Lớp học
                </label>
                <div className="dangky-select-container">
                  <select
                    className="dangky-form-select"
                    value={selectedLop}
                    onChange={(e) => setSelectedLop(e.target.value)}
                    disabled={!selectedKhoaHoc || lops.length === 0}
                    required
                  >
                    <option value="">
                      {!selectedKhoaHoc 
                        ? "Chọn lớp học trước..." 
                        : lops.length === 0 
                          ? "Không có lớp nào"
                          : "Chọn lớp học..."
                      }
                    </option>
                    {lops.map((l) => (
                      <option key={l.lopId} value={l.lopId}>
                        {l.tenLop}
                      </option>
                    ))}
                  </select>
                  <div className="dangky-select-arrow">▼</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="dangky-form-actions">
                <button 
                  type="button" 
                  className="dangky-action-btn dangky-btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="dangky-action-btn dangky-btn-primary"
                  disabled={isLoading || !selectedKhoaHoc || !selectedLop}
                >
                  {isLoading ? (
                    <>
                      <div className="dangky-loading-spinner"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>🚀 Xác Nhận Đăng Ký</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangKyKhoaHocCreate;
