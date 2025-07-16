import React, { useEffect, useState } from "react";
import { getAllDangKy } from "../../services/dangKyApi";
import "./DangKyKhoaHocPage.css";

const DangKyKhoaHocPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await getAllDangKy();
      setData(result);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    const totalRegistrations = data.length;
    const uniqueStudents = new Set(data.map(item => item.tenHocVien)).size;
    const uniqueCourses = new Set(data.map(item => item.tenKhoaHoc)).size;
    return { totalRegistrations, uniqueStudents, uniqueCourses };
  };

  const stats = getStats();

  return (
    <div className="dangky-list-page">
      <div className="dangky-list-content">
        {/* Header */}
        <div className="dangky-list-header">
          <div className="dangky-header-info">
            <div className="dangky-list-header-icon">📊</div>
            <div className="dangky-header-text">
              <h1>Danh sách đăng ký khóa học</h1>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dangky-stats-container">
          <div className="dangky-stat-card">
            <span className="dangky-stat-number">{stats.totalRegistrations}</span>
            <span className="dangky-stat-label">Tổng đăng ký</span>
          </div>
          <div className="dangky-stat-card">
            <span className="dangky-stat-number">{stats.uniqueStudents}</span>
            <span className="dangky-stat-label">Học viên</span>
          </div>
          <div className="dangky-stat-card">
            <span className="dangky-stat-number">{stats.uniqueCourses}</span>
            <span className="dangky-stat-label">Khóa học</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="dangky-data-table-container">
          <div className="dangky-table-header">
            <h2 className="dangky-table-title">📋 Hồ sơ đăng ký</h2>
            <button className="dangky-refresh-btn" onClick={loadData}>
              🔄 Làm mới
            </button>
          </div>

          {isLoading ? (
            <div className="dangky-loading-container">
              <div className="dangky-loading-spinner"></div>
            </div>
          ) : data.length === 0 ? (
            <div className="dangky-empty-state">
              <div className="dangky-empty-icon">📝</div>
              <div className="dangky-empty-text">Chưa có đăng ký nào</div>
              <div className="dangky-empty-subtext">
                Khi có đăng ký mới, thông tin sẽ hiển thị ở đây
              </div>
            </div>
          ) : (
            <table className="dangky-data-table">
              <thead className="dangky-table-head">
                <tr>
                  <th>👨‍🎓 Học viên</th>
                  <th>📚 Khóa học</th>
                  <th>📅 Ngày đăng ký</th>
                </tr>
              </thead>
              <tbody className="dangky-table-body">
                {data.map((item) => (
                  <tr key={item.dangKyKhoaHocId}>
                    <td>
                      <div className="dangky-student-name">
                        <div className="dangky-student-avatar">
                          {item.tenHocVien.charAt(0).toUpperCase()}
                        </div>
                        <span>{item.tenHocVien}</span>
                      </div>
                    </td>
                    <td>
                      <div className="dangky-course-badge">
                        {item.tenKhoaHoc}
                      </div>
                    </td>
                    <td>
                      <div className="dangky-date-cell">
                        {formatDate(item.ngayDangKy)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DangKyKhoaHocPage;
