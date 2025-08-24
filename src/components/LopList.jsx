import React, { useEffect, useState } from "react";
import { getAllLop, deleteLop } from "../services/lopApi";
import { useNavigate } from "react-router";
import useRole from "../hooks/useRole";
import "./LopList.css";

const LopList = () => {
  const [lops, setLops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    getAllLop()
      .then(setLops)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa lớp học này?")) {
      try {
        await deleteLop(id);
        setLops(await getAllLop());
      } catch (error) {
        alert("Xóa thất bại.");
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="lop-container">
        <div className="lop-content">
          <div className="lop-loading">
            <div className="lop-loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lop-container">
      <div className="lop-content">
        <div className="lop-header">
          <h1 className="lop-title">Quản Lý Lớp Học</h1>
          <p className="lop-subtitle">
          </p>
          {(isAdmin || isGiangVien) && (
            <button
              className="lop-add-btn"
              onClick={() => navigate("/lop/create")}
            >
              ➕ Tạo Lớp Học Mới
            </button>
          )}
        </div>

        {lops.length === 0 ? (
          <div className="lop-empty">
            <div className="lop-empty-icon">🎓</div>
            <div className="lop-empty-text">Chưa có lớp học nào</div>
            <div className="lop-empty-subtext">
              Hãy tạo lớp học đầu tiên để bắt đầu quản lý
            </div>
          </div>
        ) : (
          <div className="lop-grid">
            {lops.map((lop, index) => (
              <div key={lop.lopId} className="lop-card">
                <div className="lop-card-header">
                  <div className="lop-card-icon">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="lop-card-title">{lop.tenLop}</h3>
                </div>

                <div className="lop-card-body">
                  <div className="lop-info-grid">
                    <div className="lop-info-item lop-date-range">
                      <div className="lop-info-label">📅 Thời Gian Học</div>
                      <div className="lop-info-value">
                        {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} → {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="lop-info-item">
                      <div className="lop-info-label">🎯 Khóa Học</div>
                      <div className="lop-info-value">{lop.khoaHocName}</div>
                    </div>
                    <div className="lop-info-item">
                      <div className="lop-info-label">📂 Loại Lớp</div>
                      <div className="lop-info-value">{lop.loaiLopName}</div>
                    </div>
                  </div>
                </div>
                <div className="lop-actions">
                  <button
                    className="lop-btn lop-btn-view"
                    onClick={() => navigate(`/lop/${lop.lopId}`)}
                  >
                    👁️ Xem
                  </button>

                  {(isAdmin || isGiangVien) && (
                    <button
                      className="lop-btn lop-btn-edit"
                      onClick={() => navigate(`/lop/edit/${lop.lopId}`)}
                    >
                      ✏️ Sửa
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      className="lop-btn lop-btn-delete"
                      onClick={() => handleDelete(lop.lopId)}
                    >
                      🗑️ Xóa
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LopList; 
