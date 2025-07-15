import React, { useEffect, useState } from "react";
import { getChiTietLopsByLopId, deleteChiTietLop } from "../services/chiTietLopApi";
import { useNavigate, useParams } from "react-router";
import useRole from "../hooks/useRole";
import { FaArrowLeft,FaPlus,FaEye,FaEdit,FaTrash,FaUserCheck,FaCalendarAlt,FaClock,FaChalkboardTeacher,FaUsers,FaSpinner,FaExclamationTriangle} from "react-icons/fa";
import "../pages/css/ChiTietLop/ChiTietLopList.css";

const ChiTietLopList = () => {
  const [buoiHocList, setBuoiHocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lopId } = useParams(); 
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getChiTietLopsByLopId(lopId); 
        setBuoiHocList(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách buổi học:", error);
      } finally {
        setLoading(false);
      }
    };
    if (lopId) fetchData();
  }, [lopId]); 

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa buổi học này?")) {
      try {
        await deleteChiTietLop(id);
        setBuoiHocList((prev) => prev.filter((item) => item.chiTietLopId !== id));
      } catch (error) {
        console.error("Lỗi khi xóa buổi học:", error);
        alert("Không thể xóa buổi học!");
      }
    }
  };

  const formatTime = (timeString) => {
    return timeString?.substring(0, 5) || "N/A";
  };

  const getSessionStatus = (ngayHoc, thoiGianKetThuc) => {
    const now = new Date();
    const sessionDate = new Date(ngayHoc);
    const [hours, minutes] = (thoiGianKetThuc || "00:00").split(':');
    sessionDate.setHours(parseInt(hours), parseInt(minutes));

    if (sessionDate > now) return 'upcoming';
    if (sessionDate.toDateString() === now.toDateString()) return 'ongoing';
    return 'completed';
  };

  if (loading) {
    return (
      <div className="chitiet-lop-page">
        <div className="loading-container">
          <div className="loading-content">
            <FaSpinner className="loading-spinner" />
            <h3>Đang tải danh sách buổi học...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chitiet-lop-page">
      {/* Background Effects */}
      <div className="page-background">
        <div className="bg-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-particle"></div>
          ))}
        </div>
        <div className="bg-shapes">
          <div className="bg-shape shape-circle"></div>
          <div className="bg-shape shape-square"></div>
          <div className="bg-shape shape-triangle"></div>
        </div>
      </div>

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <button 
                className="back-btn icon-only"
                onClick={() => navigate("/lop")}
                title="Quay lại"
              >
                <FaArrowLeft />
            </button>
            
            <div className="header-info">
              <div className="header-text">
                <h1>Danh sách buổi học</h1>
              </div>
            </div>
          </div>
          
          {(isAdmin || isGiangVien) && (
            <button
              className="add-session-btn"
              onClick={() => navigate(`/chi-tiet-lop/create/${lopId}`)}
            >
              <FaPlus />
              <span>Thêm buổi học</span>
            </button>
          )}
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <div className="stat-number">{buoiHocList.length}</div>
              <div className="stat-label">Tổng buổi học</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon completed">
              <FaUsers />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {buoiHocList.filter(item => getSessionStatus(item.ngayHoc, item.thoiGianKetThuc) === 'completed').length}
              </div>
              <div className="stat-label">Đã hoàn thành</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon upcoming">
              <FaClock />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {buoiHocList.filter(item => getSessionStatus(item.ngayHoc, item.thoiGianKetThuc) === 'upcoming').length}
              </div>
              <div className="stat-label">Sắp diễn ra</div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="sessions-container">
          {buoiHocList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaExclamationTriangle />
              </div>
              <h3>Chưa có buổi học nào</h3>
              <p>Hãy thêm buổi học đầu tiên để bắt đầu</p>
              {(isAdmin || isGiangVien) && (
                <button
                  className="empty-add-btn"
                  onClick={() => navigate(`/chi-tiet-lop/create/${lopId}`)}
                >
                  <FaPlus />
                  <span>Thêm buổi học ngay</span>
                </button>
              )}
            </div>
          ) : (
            <div className="sessions-grid">
              {buoiHocList.map((item, index) => {
                const status = getSessionStatus(item.ngayHoc, item.thoiGianKetThuc);
                
                return (
                  <div 
                    key={item.chiTietLopId} 
                    className={`session-card ${status}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="session-header">
                      <div className="session-date">
                        <FaCalendarAlt />
                        <div className="date-info">
                          <span className="date-main">
                            {new Date(item.ngayHoc).toLocaleDateString('vi-VN')}
                          </span>
                          <span className="date-weekday">
                            {new Date(item.ngayHoc).toLocaleDateString('vi-VN', { weekday: 'long' })}
                          </span>
                        </div>
                      </div>
                      <div className={`status-badge ${status}`}>
                        {status === 'completed' && 'Đã hoàn thành'}
                        {status === 'ongoing' && 'Đang diễn ra'}
                        {status === 'upcoming' && 'Sắp diễn ra'}
                      </div>
                    </div>

                    <div className="session-body">
                      <div className="session-time">
                        <div className="time-item">
                          <FaClock />
                          <span>Bắt đầu: {formatTime(item.thoiGianBatDau)}</span>
                        </div>
                        <div className="time-item">
                          <FaClock />
                          <span>Kết thúc: {formatTime(item.thoiGianKetThuc)}</span>
                        </div>
                      </div>

                      <div className="session-teacher">
                        <FaChalkboardTeacher />
                        <span>{item.tenGiangVien || "Chưa phân công giảng viên"}</span>
                      </div>
                    </div>

                    <div className="session-actions">
                      <button
                        className="action-btn view"
                        onClick={() => navigate(`/chi-tiet-lop/detail/${item.chiTietLopId}`)}
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>

                      {(isAdmin || isGiangVien) && (
                        <>
                          <button
                            className="action-btn edit"
                            onClick={() => navigate(`/chi-tiet-lop/edit/${item.chiTietLopId}`)}
                            title="Chỉnh sửa"
                          >
                            <FaEdit />
                          </button>
                          
                          <button
                            className="action-btn delete"
                            onClick={() => handleDelete(item.chiTietLopId)}
                            title="Xóa"
                          >
                            <FaTrash />
                          </button>

                          <button
                            className="action-btn attendance"
                            onClick={() => navigate(`/diem-danh/${lopId}/${item.chiTietLopId}`)}
                            title="Điểm danh"
                          >
                            <FaUserCheck />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChiTietLopList;