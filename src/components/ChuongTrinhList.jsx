import React, { useEffect, useState } from "react";
import { getAllChuongTrinh, deleteChuongTrinh } from "../services/chuongTrinhApi";
import { useNavigate } from "react-router";
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaBook,
  FaGraduationCap,
  FaUsers,
  FaChartBar,
  FaSpinner,
  FaFileAlt,
  FaAward
} from "react-icons/fa";
import "../pages/css/ChuongTrinh/ChuongTrinhList.css";

const ChuongTrinhList = () => {
  const [chuongTrinhs, setChuongTrinhs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllChuongTrinh();
      setChuongTrinhs(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = chuongTrinhs.filter(ct =>
      ct.tenChuongTrinh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ct.moTa && ct.moTa.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchTerm, chuongTrinhs]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chương trình này?")) {
      try {
        await deleteChuongTrinh(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Có lỗi xảy ra khi xóa chương trình!");
      }
    }
  };

  const getEducationalIcon = (index) => {
    const icons = [FaBook, FaGraduationCap, FaFileAlt, FaAward, FaUsers, FaChartBar];
    return icons[index % icons.length];
  };

  const getEducationalColor = (index) => {
    const colors = [
      { primary: "#2563eb", secondary: "#1d4ed8", name: "blue" },
      { primary: "#059669", secondary: "#047857", name: "emerald" },
      { primary: "#dc2626", secondary: "#b91c1c", name: "red" },
      { primary: "#ea580c", secondary: "#c2410c", name: "orange" },
      { primary: "#0891b2", secondary: "#0e7490", name: "cyan" },
      { primary: "#7c2d12", secondary: "#92400e", name: "amber" },
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="program-list-container">
        <div className="program-background">
          <div className="program-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="program-dot"></div>
            ))}
          </div>
        </div>

        <div className="program-loading">
          <div className="loading-content">
            <div className="loading-icon">
              <FaSpinner className="spinner-icon" />
            </div>
            <h3>Đang tải danh sách chương trình...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="program-list-container">
      {/* Background Effects */}
      <div className="program-background">
        <div className="program-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="program-dot"></div>
          ))}
        </div>
        <div className="program-shapes">
          <div className="program-shape shape-circle"></div>
          <div className="program-shape shape-square"></div>
          <div className="program-shape shape-triangle"></div>
          <div className="program-shape shape-hexagon"></div>
        </div>
      </div>

      {/* Header */}
      <div className="program-header">
        <div className="header-left">
          <div className="header-icon">
            <FaGraduationCap />
          </div>
          <div className="header-text">
            <h1>Danh sách chương trình đào tạo</h1>
          </div>
        </div>
        <button
          className="btn-add-new"
          onClick={() => navigate("/chuong-trinh/create")}
        >
          <FaPlus />
          <span>Thêm mới</span>
        </button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm chương trình đào tạo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="programs-grid">
        {filteredData.map((ct, index) => {
          const IconComponent = getEducationalIcon(index);
          const colors = getEducationalColor(index);

          return (
            <div
              key={ct.chuongTrinhDaoTaoId}
              className={`program-card ${colors.name} ${
                hoveredCard === ct.chuongTrinhDaoTaoId ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredCard(ct.chuongTrinhDaoTaoId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <div 
                  className="card-icon"
                  style={{ backgroundColor: colors.primary }}
                >
                  <IconComponent />
                </div>
                <div className="card-number">
                  #{String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="card-body">
                <h3 className="card-title">{ct.tenChuongTrinh}</h3>
                <div 
                  className="card-id"
                  style={{ backgroundColor: colors.primary }}
                >
                  ID: {ct.chuongTrinhDaoTaoId}
                </div>
                <p className="card-description">
                  {ct.moTa || "Chưa có mô tả cho chương trình này"}
                </p>
              </div>

              <div className="card-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <FaBook />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{ct.khoaHocs?.length || 0}</span>
                    <span className="stat-label">Khóa học</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">
                      {ct.khoaHocs?.reduce((total, kh) => 
                        total + (kh.lops?.length || 0), 0) || 0}
                    </span>
                    <span className="stat-label">Lớp học</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => navigate(`/chuong-trinh/${ct.chuongTrinhDaoTaoId}`)}
                  title="Xem chi tiết"
                >
                  <FaEye />
                  <span>Xem</span>
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => navigate(`/chuong-trinh/edit/${ct.chuongTrinhDaoTaoId}`)}
                  title="Chỉnh sửa"
                >
                  <FaEdit />
                  <span>Sửa</span>
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(ct.chuongTrinhDaoTaoId)}
                  title="Xóa"
                >
                  <FaTrash />
                  <span>Xóa</span>
                </button>
              </div>

              <div className="card-indicator">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`indicator-dot ${i < 2 ? 'active' : ''}`}
                    style={{ backgroundColor: i < 2 ? colors.primary : '#e2e8f0' }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="empty-state">
          <div className="empty-content">
            <div className="empty-icon">
              <FaBook />
            </div>
            <h3>Không tìm thấy chương trình</h3>
            <p>Không có chương trình nào khớp với từ khóa tìm kiếm của bạn</p>
            <button
              className="btn-create-first"
              onClick={() => navigate("/chuong-trinh/create")}
            >
              <FaPlus />
              <span>Tạo chương trình đầu tiên</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChuongTrinhList;