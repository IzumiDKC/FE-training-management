import React, { useEffect, useState } from "react";
import { getAllKhoaHoc, deleteKhoaHoc } from "../services/khoaHocApi";
import { useNavigate } from "react-router";
import "./KhoaHocList.css";
import useRole from "../hooks/useRole";
const KhoaHocList = () => {
  const [khoaHocs, setKhoaHocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin, isGiangVien } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await getAllKhoaHoc();
      setKhoaHocs(result);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      try {
        await deleteKhoaHoc(id);
        await loadData();
        alert("Xóa khóa học thành công!");
      } catch (err) {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa khóa học!");
      }
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };
  const isCourseActive = (khoaHoc) => {
    if (!khoaHoc.lops || khoaHoc.lops.length === 0) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return khoaHoc.lops.some((lop) => {
      if (!lop.ngayKetThucDuKien) return true;
      const endDate = new Date(lop.ngayKetThucDuKien);
      return endDate >= today;
    });
  };

  const isCourseEnded = (khoaHoc) => {
    if (!khoaHoc.lops || khoaHoc.lops.length === 0) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { endDate } = getCourseDateRange(khoaHoc);
    if (!endDate) return false;
    return endDate < today;
  };
  const getCourseDateRange = (khoaHoc) => {
    if (!khoaHoc.lops || khoaHoc.lops.length === 0) {
      return { startDate: null, endDate: null };
    }
    const startDates = khoaHoc.lops
      .filter((lop) => lop.ngayBatDauDuKien)
      .map((lop) => new Date(lop.ngayBatDauDuKien));

    const endDates = khoaHoc.lops
      .filter((lop) => lop.ngayKetThucDuKien)
      .map((lop) => new Date(lop.ngayKetThucDuKien));

    const startDate =
      startDates.length > 0 ? new Date(Math.min(...startDates)) : null;
    const endDate =
      endDates.length > 0 ? new Date(Math.max(...endDates)) : null;

    return { startDate, endDate };
  };

  if (isLoading) {
    return (
      <div className="khoahoc-loading-container">
        <div className="khoahoc-loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (khoaHocs.length === 0) {
    return (
      <div className="khoahoc-empty-state">
        <div className="khoahoc-empty-icon">📚</div>
        <div className="khoahoc-empty-text">Chưa có khóa học nào</div>
        <div className="khoahoc-empty-subtext">
          Hãy tạo khóa học đầu tiên để bắt đầu
        </div>
        {(isAdmin || isGiangVien) && (
        <button
          className="khoahoc-empty-btn"
          onClick={() => navigate("/khoa-hoc/create")}
        >
          Tạo khóa học ngay
        </button>
        )}
      </div>
    );
  }

  return (
    <div className="khoahoc-list-container">
      {/* Stats */}
      <div className="khoahoc-stats">
        <div className="khoahoc-stat-card">
          <div className="khoahoc-stat-number">{khoaHocs.length}</div>
          <div className="khoahoc-stat-label">Tổng khóa học</div>
        </div>
        <div className="khoahoc-stat-card">
          <div className="khoahoc-stat-number">
            {khoaHocs.filter((k) => isCourseActive(k)).length}
          </div>
          <div className="khoahoc-stat-label">Đang hoạt động</div>
        </div>
        <div className="khoahoc-stat-card">
          <div className="khoahoc-stat-number">
            {khoaHocs.filter((k) => isCourseEnded(k)).length}
          </div>
          <div className="khoahoc-stat-label">Đã kết thúc</div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="khoahoc-grid">
        {khoaHocs.map((khoaHoc, index) => {
          const { startDate, endDate } = getCourseDateRange(khoaHoc);
          return (
            <div
              key={khoaHoc.khoaHocId}
              className="khoahoc-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="khoahoc-card-header">
                <div className="khoahoc-card-icon">📖</div>
                <div className="khoahoc-card-status">
                  {(() => {
                    if (!khoaHoc.lops || khoaHoc.lops.length === 0) {
                      return <span className="status-ended">Chưa có lớp</span>;
                    }
                    
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (!endDate) {
                      return <span className="status-active">Hoạt động</span>;
                    }
                    
                    return endDate >= today ? (
                      <span className="status-active">Hoạt động</span>
                    ) : (
                      <span className="status-ended">Đã kết thúc</span>
                    );
                  })()}
                </div>
              </div>

              <div className="khoahoc-card-content">
                <h3 className="khoahoc-card-title">{khoaHoc.tenKhoaHoc}</h3>
                <p className="khoahoc-card-description">{khoaHoc.moTa}</p>

                <div className="khoahoc-card-info">
                  <div className="khoahoc-info-item">
                    <span className="info-label">📅 Bắt đầu:</span>
                    <span className="info-value">
                      {startDate ? formatDate(startDate) : "Thời điểm bắt đầu chưa có"}
                    </span>
                  </div>
                  <div className="khoahoc-info-item">
                    <span className="info-label">🏁 Kết thúc:</span>
                    <span className="info-value">
                      {endDate ? formatDate(endDate) : "Thời điểm kết thúc chưa có"}
                    </span>
                  </div>
                  <div className="khoahoc-info-item">
                    <span className="info-label">🏫 Số lớp:</span>
                    <span className="info-value">
                      {khoaHoc.lops ? khoaHoc.lops.length : 0} lớp
                    </span>
                  </div>
                </div>
              </div>

              <div className="khoahoc-card-actions">
                <button
                  className="khoahoc-btn-view"
                  onClick={() => navigate(`/khoa-hoc/${khoaHoc.khoaHocId}`)}
                >
                  👁️ Xem
                </button>
                {(isAdmin || isGiangVien) && (
                <button
                  className="khoahoc-btn-edit"
                  onClick={() => navigate(`/khoa-hoc/edit/${khoaHoc.khoaHocId}`)}
                >
                  ✏️ Sửa
                </button>
                )}
                {isAdmin && (
                <button
                  className="khoahoc-btn-delete"
                  onClick={() => handleDelete(khoaHoc.khoaHocId)}
                >
                  🗑️ Xóa
                </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KhoaHocList;
