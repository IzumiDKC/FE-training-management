import React, { useEffect, useState } from "react";
import { getAllLoaiLop, deleteLoaiLop } from "../services/loaiLopApi";
import { useNavigate } from "react-router";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaGraduationCap,
  FaPlus,
  FaSpinner,
  FaBook,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBrain,
  FaLaptopCode,
  FaPaintBrush,
  FaFlask,
} from "react-icons/fa";
import "../pages/css/LoaiLop/LoaiLopList.css";

const LoaiLopList = () => {
  const [loaiLops, setLoaiLops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllLoaiLop();
      setLoaiLops(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa loại lớp này?")) {
      try {
        await deleteLoaiLop(id);
        fetchData();
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  const getEducationalIcon = (index) => {
    const icons = [
      FaGraduationCap,
      FaBook,
      FaChalkboardTeacher,
      FaUserGraduate,
      FaBrain,
      FaLaptopCode,
      FaPaintBrush,
      FaFlask,
    ];
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
      { primary: "#4338ca", secondary: "#3730a3", name: "indigo" },
      { primary: "#be185d", secondary: "#9d174d", name: "pink" },
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="modern-loading">
        <div className="loading-content">
          <div className="loading-icon">
            <FaSpinner className="spinner-icon" />
          </div>
          <h3>Đang tải dữ liệu...</h3>
          <p>Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (loaiLops.length === 0) {
    return (
      <div className="modern-empty">
        <div className="empty-content">
          <div className="empty-icon">
            <FaGraduationCap />
          </div>
          <h3>Chưa có loại lớp nào</h3>
          <p>Hãy tạo loại lớp đầu tiên để bắt đầu quản lý</p>
          <button
            className="btn-create-first"
            onClick={() => navigate("/loai-lop/create")}
          >
            <FaPlus />
            <span>Tạo loại lớp đầu tiên</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-container">
      {/* Background Particles */}
      <div className="list-particles">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`list-dot`}></div>
        ))}
      </div>

      <div className="modern-header">
        <div className="header-left">
          <div className="header-icon">
            <FaGraduationCap />
          </div>
          <div className="header-text">
            <h1>Danh sách Loại lớp</h1>
          </div>
        </div>
        <button
          className="btn-add-new"
          onClick={() => navigate("/loai-lop/create")}
        >
          <FaPlus />
          <span>Thêm mới</span>
        </button>
      </div>

      <div className="cards-grid">
        {loaiLops.map((l, index) => {
          const IconComponent = getEducationalIcon(index);
          const colors = getEducationalColor(index);

          return (
            <div
              key={l.loaiLopId}
              className={`modern-card ${colors.name} ${
                hoveredCard === l.loaiLopId ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredCard(l.loaiLopId)}
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
                <h3 className="card-title">{l.tenLoaiLop}</h3>
                <div
                  className="card-id"
                  style={{ backgroundColor: colors.primary }}
                >
                  ID: {l.loaiLopId}
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => navigate(`/loai-lop/${l.loaiLopId}`)}
                >
                  <FaEye />
                  <span>Xem</span>
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => navigate(`/loai-lop/edit/${l.loaiLopId}`)}
                >
                  <FaEdit />
                  <span>Sửa</span>
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(l.loaiLopId)}
                >
                  <FaTrash />
                  <span>Xóa</span>
                </button>
              </div>

              <div className="card-indicator">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`indicator-dot ${i < 2 ? "active" : ""}`}
                    style={{
                      backgroundColor:
                        i < 2 ? colors.primary : "#e2e8f0",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default LoaiLopList;
