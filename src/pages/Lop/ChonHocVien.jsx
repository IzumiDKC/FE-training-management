// src/pages/Lop/ChonHocVien.jsx
import React, { useEffect, useState } from "react";
import { getHocVienSelector, themHocVienVaoLop } from "../../services/lopApi";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaUsers,FaUserPlus,FaSpinner,FaCheckCircle,FaIdCard,FaSearch,FaCheck,FaTimes,FaExclamationTriangle} from "react-icons/fa";
import "./ChonHocVien.css";

const ChonHocVien = () => {
  const { id: lopId } = useParams();
  const [hocViens, setHocViens] = useState([]);
  const [filteredHocViens, setFilteredHocViens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getHocVienSelector(lopId);
        setHocViens(data);
        setFilteredHocViens(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lopId]);

  useEffect(() => {
    const filtered = hocViens.filter(hv =>
      hv.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hv.soCanCuoc.includes(searchTerm) ||
      hv.userId.toString().includes(searchTerm)
    );
    setFilteredHocViens(filtered);
  }, [searchTerm, hocViens]);

  const handleToggleSelect = (userId) => {
    setHocViens(prev => prev.map(hv =>
      hv.userId === userId ? { ...hv, isSelected: !hv.isSelected } : hv
    ));
    setFilteredHocViens(prev => prev.map(hv =>
      hv.userId === userId ? { ...hv, isSelected: !hv.isSelected } : hv
    ));
  };

  const handleSelectAll = () => {
    const allSelected = filteredHocViens.every(hv => hv.isSelected);
    const updated = hocViens.map(hv =>
      filteredHocViens.find(fhv => fhv.userId === hv.userId)
        ? { ...hv, isSelected: !allSelected }
        : hv
    );
    setHocViens(updated);
    setFilteredHocViens(filteredHocViens.map(hv => ({ ...hv, isSelected: !allSelected })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCount = hocViens.filter(hv => hv.isSelected).length;

    if (selectedCount === 0) {
      alert("Vui lòng chọn ít nhất một học viên!");
      return;
    }

    try {
      setIsSubmitting(true);
      await themHocVienVaoLop(lopId, hocViens);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/lop");
      }, 2000);
    } catch (err) {
      alert("Thêm học viên thất bại!");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCount = hocViens.filter(hv => hv.isSelected).length;
  const allSelected = filteredHocViens.length > 0 && filteredHocViens.every(hv => hv.isSelected);

  if (loading) {
    return (
      <div className="chon-hoc-vien-page">
        <div className="loading-container">
          <div className="loading-content">
            <FaSpinner className="loading-spinner" />
            <h3>Đang tải danh sách học viên...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chon-hoc-vien-page">
      <div className="page-background">
        <div className="bg-pattern"></div>
      </div>

      <div className="page-container">
        <div className="page-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate("/lop")} type="button">
              <FaArrowLeft />
              <span>Quay lại</span>
            </button>
            <div className="header-info">
              <div className="header-text">
                <h1>Chọn học viên cho lớp #{lopId}</h1>
              </div>
            </div>
          </div>
          <div className="selection-summary">
            <div className="summary-item">
              <span className="summary-number">{selectedCount}</span>
              <span className="summary-label">Đã chọn</span>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm học viên (tên, CCCD, ID)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <div className="control-actions">
            <button
              type="button"
              className={`select-all-btn ${allSelected ? 'selected' : ''}`}
              onClick={handleSelectAll}
            >
              {allSelected ? <FaTimes /> : <FaCheck />}
              <span>{allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="selection-form">
          <div className="students-container">
            {filteredHocViens.length === 0 ? (
              <div className="empty-state">
                <FaExclamationTriangle className="empty-icon" />
                <h3>Không tìm thấy học viên</h3>
                <p>Không có học viên nào khớp với từ khóa tìm kiếm</p>
              </div>
            ) : (
              <div className="students-list">
                {filteredHocViens.map((hv) => (
                  <div key={hv.userId} className="student-item">
                    <div className="student-avatar">
                      <span>{hv.hoTen?.charAt(0) || 'H'}</span>
                    </div>
                    <div className="student-info">
                      <h3 className="student-name">{hv.hoTen}</h3>
                      <div className="student-details">
                        <div className="detail-row">
                          <div className="icon-badge cccd-icon">
                            <FaIdCard />
                          </div>
                          <div className="detail-text">
                            <label>CCCD:</label>
                            <span>{hv.soCanCuoc}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="selection-status">
                      <button
                        type="button"
                        className={`select-btn ${hv.isSelected ? "selected" : ""}`}
                        onClick={() => handleToggleSelect(hv.userId)}
                      >
                        {hv.isSelected ? (
                          <>
                            <FaCheckCircle />
                            <span>Đã chọn</span>
                          </>
                        ) : (
                          <span>Chọn</span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="submit-area">
            <div className="submit-info">
              <div className="info-stats">
                <div className="stat-item">
                  <FaUsers className="stat-icon" />
                  <span>Tổng: {filteredHocViens.length} học viên</span>
                </div>
                <div className="stat-item selected">
                  <FaCheckCircle className="stat-icon" />
                  <span>Đã chọn: {selectedCount} học viên</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={selectedCount === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="btn-spinner" />
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <span>Thêm {selectedCount} học viên vào lớp</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h3>Thêm học viên thành công!</h3>
            <p>{selectedCount} học viên đã được thêm vào lớp</p>
            <div className="success-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChonHocVien;
