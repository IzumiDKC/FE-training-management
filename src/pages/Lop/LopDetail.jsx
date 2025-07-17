import React, { useEffect, useState } from "react";
import { getLopById } from "../../services/lopApi";
import { getDsHocVienByLopId } from "../../services/dsHocVienApi";
import { useParams, useNavigate } from "react-router";
import useRole from "../../hooks/useRole";
import "./LopDetail.css";

const LopDetail = () => {
  const { id } = useParams();
  const [lop, setLop] = useState(null);
  const [dsHocVien, setDsHocVien] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    if (!id) return;

    getLopById(id)
      .then((data) => {
        setLop(data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy lớp:", err);
        setMessage("Không tìm thấy lớp học.");
      });
  }, [id]);

  useEffect(() => {
    if (!lop || !id || !(isAdmin || isGiangVien)) return;

    if (!lop.coDanhSachHocVien) {
      setMessage("Lớp học này chưa có danh sách học viên.");
      return;
    }

    getDsHocVienByLopId(id)
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setDsHocVien(data);
        }
      })
      .catch((err) => {
        console.error("Không thể lấy danh sách học viên:", err);
        setMessage("Không thể hiển thị danh sách học viên.");
      });
  }, [lop, id, isAdmin, isGiangVien]);

  if (!lop) {
    return (
      <div className="lop-detail-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin lớp học...</p>
      </div>
    );
  }

  return (
    <div className="lop-detail-wrapper">
      {/* Header Section */}
      <div className="lop-detail-header">
        <div className="header-content">
          <div className="header-title">
            <span className="title-icon">🎓</span>
            <h1>{lop.tenLop}</h1>
          </div>
          <div className="header-actions">
            {(isAdmin || isGiangVien) && (
              <button
                className="btn btn-light btn-sm me-2 custom-edit-btn"
                onClick={() => navigate(`/lop/edit/${lop.lopId}`)}
              >
                Chỉnh sửa lớp
              </button>
            )}
            <button
              className="btn btn-info btn-sm me-2 custom-view-btn"
              onClick={() => navigate(`/chi-tiet-lop/${lop.lopId}`)}
            >
              Xem buổi học
            </button>
            <button
              className="btn btn-secondary btn-sm custom-back-btn"
              onClick={() => navigate("/lop")}
            >
              ⬅️ Quay lại
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lop-detail-content">
        {/* Class Information Card */}
        <div className="info-card">
          <div className="card-header-custom">
            <h3>📄 Thông tin lớp học</h3>
          </div>
          <div className="card-body-custom">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <span className="label-icon">🆔</span>
                  Tên lớp
                </div>
                <div className="info-value">{lop.tenLop}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <span className="label-icon">📘</span>
                  Khóa học
                </div>
                <div className="info-value">{lop.khoaHocName}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <span className="label-icon">🏷️</span>
                  Loại lớp
                </div>
                <div className="info-value">{lop.loaiLopName}</div>
              </div>

                  <div className="info-item">
                    <div className="info-label">
                      <span className="label-icon">📅</span>
                      Thời gian học
                    </div>
                    <div className="info-value">
                      {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} -{" "}
                      {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">
                      <span className="label-icon">⏱️</span>
                      Số giờ
                    </div>
                    <div className="info-value">
                      {lop.soGio} giờ ({lop.soGioQuyDoi} giờ quy đổi)
                    </div>
                    </div>
                  </div>
                </div>
              </div>
        {/* Student List Section */}
        {(isAdmin || isGiangVien) && (
          <div className="students-card">
            <div className="card-header-custom">
              <h3>📋 Danh sách học viên</h3>
            </div>
            <div className="card-body-custom">
              {message && (
                <div className="alert alert-info custom-alert">{message}</div>
              )}

              {!message && (
                <div className="table-container">
                  <table className="table table-bordered table-striped custom-table">
                    <thead>
                      <tr>
                        <th>🆔 Mã học viên</th>
                        <th>👤 Họ tên học viên</th>
                        <th>💳 Số CCCD</th>
                        <th>⚙️ Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dsHocVien.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center empty-state">
                            Không có học viên
                          </td>
                        </tr>
                      ) : (
                        dsHocVien.map((item) => (
                          <tr key={item.danhSachHocVienId}>
                            <td>{item.hocVienId}</td>
                            <td>{item.hocVienName}</td>
                            <td>{item.soCanCuoc}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-success custom-evaluate-btn"
                                onClick={() =>
                                  navigate(`/danh-gia/create/${item.hocVienId}/${id}`)
                                }
                              >
                                📝 Đánh giá
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {(isAdmin || isGiangVien) && lop && (
                <div className="add-student-section">
                  <button
                    className="btn btn-outline-primary custom-add-btn"
                    onClick={() => navigate(`/lop/chon-hoc-vien/${lop.lopId}`)}
                  >
                    ➕ Thêm học viên vào lớp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LopDetail;
