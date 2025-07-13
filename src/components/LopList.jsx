import React, { useEffect, useState, useRef } from "react";
import { getAllLop, deleteLop } from "../services/lopApi";
import { useNavigate } from "react-router";
import useRole from "../hooks/useRole";
import { gsap } from "gsap";
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaUsers, 
  FaCalendarAlt,
  FaGraduationCap,
  FaBookOpen,
  FaFilter,
  FaSearch,
  FaChevronDown
} from "react-icons/fa";
import "../pages/css/Lop/LopList.css";

const LopList = () => {
  const [lops, setLops] = useState([]);
  const [filteredLops, setFilteredLops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { isAdmin, isGiangVien } = useRole();
  const navigate = useNavigate();

  // GSAP refs
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLop();
        setLops(data);
        setFilteredLops(data);
        
        // Simple entrance animations
        gsap.fromTo(containerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
        
        gsap.fromTo(".class-card",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = lops;
    
    if (searchTerm) {
      filtered = filtered.filter(lop =>
        lop.tenLop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lop.khoaHocName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedFilter !== "all") {
      filtered = filtered.filter(lop => lop.loaiLopName === selectedFilter);
    }
    
    setFilteredLops(filtered);
  }, [searchTerm, selectedFilter, lops]);

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa lớp học này?")) {
      const card = document.querySelector(`[data-class-id="${id}"]`);
      
      gsap.to(card, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: async () => {
          await deleteLop(id);
          const newData = await getAllLop();
          setLops(newData);
          setFilteredLops(newData);
        }
      });
    }
  };

  const handleButtonClick = (action, e) => {
    e.stopPropagation();
    const button = e.target.closest('button');
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: action
    });
  };

  const getLoaiLopTypes = () => {
    const types = [...new Set(lops.map(lop => lop.loaiLopName))];
    return types;
  };

  const getCardIcon = (index) => {
    const icons = [
      { icon: FaGraduationCap, color: '#4F46E5' },
      { icon: FaBookOpen, color: '#059669' },
      { icon: FaUsers, color: '#DC2626' },
      { icon: FaCalendarAlt, color: '#7C3AED' }
    ];
    return icons[index % icons.length];
  };

  const getStatusColor = (loaiLop) => {
    const colors = {
      'Offline': '#3B82F6',
      'Online': '#10B981', 
      'Hybrid': '#F59E0B',
      'default': '#6366F1'
    };
    return colors[loaiLop] || colors.default;
  };

  return (
    <div className="class-management-container" ref={containerRef}>
      {/* Header Section */}
      <div className="page-header" ref={headerRef}>
        <div className="header-content">
          <div className="header-left">
            <div className="page-icon">
              <FaGraduationCap />
            </div>
            <div className="page-title">
              <h1>Danh sách Lớp học</h1>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="btn-add-class"
              onClick={(e) => handleButtonClick(() => navigate("/lop/create"), e)}
            >
              <FaPlus />
              <span>Thêm mới</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="controls-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm lớp học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="filter-container">
            <div className="filter-wrapper">
              <FaFilter className="filter-icon" />
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tất cả loại lớp</option>
                {getLoaiLopTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <FaChevronDown className="dropdown-icon" />
            </div>
          </div>

          <div className="results-info">
            <span className="results-text">
              {filteredLops.length} / {lops.length} lớp
            </span>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid" ref={cardsRef}>
        {filteredLops.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <FaBookOpen />
            </div>
            <h3>Không tìm thấy lớp học</h3>
            <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        ) : (
          filteredLops.map((lop, index) => {
            const cardIcon = getCardIcon(index);
            const IconComponent = cardIcon.icon;
            
            return (
              <div 
                key={lop.lopId} 
                className="class-card"
                data-class-id={lop.lopId}
              >
                {/* Card Header */}
                <div className="card-header">
                  <div className="card-icon" style={{ backgroundColor: cardIcon.color }}>
                    <IconComponent />
                  </div>
                  <div className="card-id">#{String(index + 1).padStart(3, '0')}</div>
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <div className="class-title">
                    <h3>{lop.tenLop}</h3>
                  </div>

                  <div className="class-info">
                    <div className="info-item">
                      <span className="info-label">Khóa học:</span>
                      <span className="info-value">{lop.khoaHocName}</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">Thời gian:</span>
                      <span className="info-value time-range">
                        {new Date(lop.ngayBatDauDuKien).toLocaleDateString('vi-VN')} - 
                        {new Date(lop.ngayKetThucDuKien).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="status-section">
                    <div 
                      className="status-badge"
                      style={{ 
                        backgroundColor: `${getStatusColor(lop.loaiLopName)}15`,
                        color: getStatusColor(lop.loaiLopName),
                        borderColor: `${getStatusColor(lop.loaiLopName)}30`
                      }}
                    >
                      ID-{index + 1}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="card-actions">
                  <button 
                    className="action-btn btn-view"
                    onClick={(e) => handleButtonClick(() => navigate(`/lop/${lop.lopId}`), e)}
                    title="Xem chi tiết"
                  >
                    <FaEye />
                    <span>Xem</span>
                  </button>

                  <button 
                    className="action-btn btn-edit"
                    onClick={(e) => handleButtonClick(() => navigate(`/lop/edit/${lop.lopId}`), e)}
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                    <span>Sửa</span>
                  </button>

                  {(isAdmin || isGiangVien) && (
                    <button 
                      className="action-btn btn-delete"
                      onClick={() => handleDelete(lop.lopId)}
                      title="Xóa lớp"
                    >
                      <FaTrash />
                      <span>Xóa</span>
                    </button>
                  )}
                </div>

                {/* Card Footer Decoration */}
                <div className="card-footer">
                  <div className="footer-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LopList;