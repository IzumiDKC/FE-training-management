import React, { useEffect, useState } from "react";
import { getLopById } from "../../services/lopApi";
import { getDsHocVienByLopId } from "../../services/dsHocVienApi";
import { useParams, useNavigate } from "react-router";
import useRole from "../../hooks/useRole";
import { 
  FaArrowLeft, 
  FaEdit,
  FaEye,
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaInfoCircle,
  FaIdBadge,
  FaSpinner,
  FaCalendarAlt,
  FaClock,
  FaUserGraduate,
  FaChartBar,
  FaSchool,
  FaBookOpen,
  FaCalendar
} from "react-icons/fa";
import "../css/Lop/LopDetail.css";
const LopDetail = () => {
  const { id } = useParams();
  const [lop, setLop] = useState(null);
  const [dsHocVien, setDsHocVien] = useState([]);
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const lopData = await getLopById(id);
        setLop(lopData);

        if (id && (isAdmin || isGiangVien)) {
          try {
            const hocVienData = await getDsHocVienByLopId(id);
            if (hocVienData.message) {
              setMessage(hocVienData.message);
            } else {
              setDsHocVien(hocVienData);
            }
          } catch (err) {
            console.error("Không thể lấy danh sách học viên:", err);
            setMessage("Không thể hiển thị danh sách học viên.");
          }
        }
      } catch (error) {
        console.error("Error loading class data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isAdmin, isGiangVien]);

  if (loading) {
    return (
      <div className="lop-detail-page">
        <div className="lop-detail-background">
          <div className="floating-elements">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="floating-element" style={{
                '--delay': `${i * 0.5}s`,
                '--duration': `${4 + i * 0.3}s`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="loading-container">
          <div className="loading-card">
            <div className="loading-spinner">
              <FaSpinner className="spinner" />
            </div>
            <h3>Đang tải thông tin lớp học</h3>
            <p>Vui lòng chờ trong giây lát...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lop) {
    return (
      <div className="lop-detail-page">
        <div className="error-container">
          <div className="error-card">
            <FaInfoCircle className="error-icon" />
            <h3>Không tìm thấy thông tin lớp học</h3>
            <p>Lớp học với ID {id} không tồn tại</p>
            <button className="btn-back" onClick={() => navigate("/lop")}>
              <FaArrowLeft />
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lop-detail-page">
      {/* Animated Background */}
      <div className="lop-detail-background">
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-element" style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${4 + i * 0.3}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="lop-detail-container">
        {/* Header Navigation */}
        <div className="page-header">
          <div className="header-content">
          <button 
            className="back-btn icon-only"
            onClick={() => navigate("/lop")}
            title="Quay lại"
          >
            <FaArrowLeft />
          </button>
            <div className="page-title">
              <FaSchool className="title-icon" />
              <div className="title-text">
                <h1>Chi tiết lớp học</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Class Info Card */}
          <div className="class-card main-info">
            <div className="card-header">
              <div className="header-icon">
                <FaUsers />
              </div>
              <div className="header-text">
                <h2>{lop.tenLop}</h2>
                <span className="class-status">Đang hoạt động</span>
              </div>
            </div>
            
            <div className="card-body">
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">
                    <FaIdBadge />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Tên lớp</span>
                    <span className="info-value">{lop.tenLop}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaBookOpen />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Khóa học</span>
                    <span className="info-value">{lop.khoaHocName || "Chưa có thông tin"}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Loại lớp</span>
                    <span className="info-value">{lop.loaiLopName || "Chưa có thông tin"}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Số giờ học</span>
                    <span className="info-value">
                      {lop.soGio} giờ 
                      <span className="sub-value">({lop.soGioQuyDoi} giờ quy đổi)</span>
                    </span>
                  </div>
                </div>

                <div className="info-item full-width">
                  <div className="info-icon">
                    <FaCalendar />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Thời gian học</span>
                    <div className="date-range">
                      <span className="date-item">
                        <strong>Bắt đầu:</strong> {new Date(lop.ngayBatDauDuKien).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="date-separator">→</span>
                      <span className="date-item">
                        <strong>Kết thúc:</strong> {new Date(lop.ngayKetThucDuKien).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="action-btn primary"
                onClick={() => navigate(`/lop/edit/${lop.lopId}`)}
              >
                <FaEdit />
                <span>Chỉnh sửa lớp</span>
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => navigate(`/chi-tiet-lop/${lop.lopId}`)}
              >
                <FaEye />
                <span>Xem buổi học</span>
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon students">
                <FaUserGraduate />
              </div>
              <div className="stat-content">
                <div className="stat-number">{dsHocVien.length}</div>
                <div className="stat-label">Học viên</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon hours">
                <FaClock />
              </div>
              <div className="stat-content">
                <div className="stat-number">{lop.soGio}</div>
                <div className="stat-label">Giờ học</div>
              </div>
            </div>
          </div>

          {/* Students List */}
          {(isAdmin || isGiangVien) && (
            <div className="students-card">
              <div className="card-header">
                <div className="header-icon">
                  <FaUsers />
                </div>
                <div className="header-text">
                  <h3>Danh sách học viên</h3>
                  <span className="student-count">{dsHocVien.length} Học viên</span>
                </div>
              </div>

              <div className="card-body">
                {message ? (
                  <div className="empty-state">
                    <FaInfoCircle className="empty-icon" />
                    <p>{message}</p>
                  </div>
                ) : dsHocVien.length === 0 ? (
                  <div className="empty-state">
                    <FaUsers className="empty-icon" />
                    <h4>Chưa có học viên</h4>
                    <p>Lớp học này chưa có học viên nào được ghi danh</p>
                  </div>
                ) : (
                  <div className="students-list">
                    {dsHocVien.map((item, index) => (
                      <div key={item.danhSachHocVienId} className="student-item">
                        <div className="student-avatar">
                          <span>{item.hocVienName?.charAt(0) || 'H'}</span>
                        </div>
                        <div className="student-info">
                          <div className="student-name">{item.hocVienName}</div>
                          <div className="student-details">
                            <span className="student-id">
                              <FaIdBadge />
                              {item.hocVienId}
                            </span>
                            <span className="student-cccd">
                              CCCD: {item.soCanCuoc}
                            </span>
                          </div>
                        </div>
                        <div className="student-actions">
                          <div className="student-badge">#{index + 1}</div>
                          <button
                            className="evaluation-btn"
                            onClick={() => navigate(`/danh-gia/create/${item.hocVienId}/${id}`)}
                            title="Đánh giá học viên"
                          >
                            📝 Đánh giá
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LopDetail;
