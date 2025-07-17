import React, { useEffect, useState } from "react";
import { getAllChuongTrinh, deleteChuongTrinh } from "../services/chuongTrinhApi";
import { useNavigate } from "react-router";
import { FaPlus, FaEye, FaEdit, FaTrash, FaSearch, FaBook, FaGraduationCap,FaBookOpen, FaUsers, FaChartBar, FaSpinner, FaFileAlt, FaAward } from "react-icons/fa";
import "./ChuongTrinhList.css";
import useRole from "../hooks/useRole";

const ChuongTrinhList = () => {
  const [chuongTrinhs, setChuongTrinhs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin, isGiangVien } = useRole();
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
      <div className="simple-program-wrapper">
        <div className="simple-loading">
          <div className="loading-spinner">
            <FaSpinner />
          </div>
          <p>Đang tải danh sách chương trình...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-program-wrapper">
      {/* Header Section */}
      <div className="simple-header">
        <div className="header-content">
          <div className="header-info">
            <div className="header-icon">
              <FaBookOpen />
            </div>
            <div className="header-text">
              <h1>Chương Trình Đào Tạo</h1>
            </div>
          </div>
          {(isAdmin || isGiangVien) && (
            <button
              className="add-button"
              onClick={() => navigate("/chuong-trinh/create")}
            >
              <FaPlus />
              <span>Thêm mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="simple-search">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm chương trình đào tạo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Programs List */}
      <div className="simple-content">
        <div className="programs-container">
          {filteredData.map((ct, index) => {
            const IconComponent = getEducationalIcon(index);
            const colors = getEducationalColor(index);

            return (
              <div
                key={ct.chuongTrinhDaoTaoId}
                className="program-item"
              >
                <div className="program-main">
                  <div className="program-icon" style={{ backgroundColor: colors.primary }}>
                    <IconComponent />
                  </div>
                  <div className="program-info">
                    <h3 className="program-title">{ct.tenChuongTrinh}</h3>
                    <div className="program-stats">
                      <span className="stats-item">
                        <FaBook />
                        <span>{ct.khoaHocs?.length || 0} khóa học</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="program-actions">
                  <button
                    className="action-btn view"
                    onClick={() => navigate(`/chuong-trinh/${ct.chuongTrinhDaoTaoId}`)}
                    title="Xem chi tiết"
                  >
                    <FaEye />
                  </button>

                  {(isAdmin || isGiangVien) && (
                    <button
                      className="action-btn edit"
                      onClick={() => navigate(`/chuong-trinh/edit/${ct.chuongTrinhDaoTaoId}`)}
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(ct.chuongTrinhDaoTaoId)}
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <FaBook />
            </div>
            <h3>Không tìm thấy chương trình</h3>
            <p>Không có chương trình nào khớp với từ khóa tìm kiếm</p>
            {(isAdmin || isGiangVien) && (
              <button
                className="create-button"
                onClick={() => navigate("/chuong-trinh/create")}
              >
                <FaPlus />
                <span>Tạo chương trình đầu tiên</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChuongTrinhList;