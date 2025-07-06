import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers, FaBook, FaChartBar, FaBars, FaHome, FaChevronDown, FaChevronUp, FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import { useSidebar } from "../contexts/SidebarContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { expanded, setExpanded } = useSidebar();
  const [openQLLop, setOpenQLLop] = useState(false);

  return (
    <div
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="sidebar-header">
        <FaBars size={22} />
        {expanded && <span className="ms-2 fw-bold">QL Đào tạo</span>}
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">
          <FaHome /> {expanded && <span className="ms-2">Trang chủ</span>}
        </Link>

        <div className={`sidebar-link sidebar-dropdown ${openQLLop ? "open" : ""}`} onClick={() => setOpenQLLop(v => !v)} style={{ cursor: "pointer" }}>
          <FaChalkboardTeacher />
          {expanded && (
            <>
              <span className="ms-2">Quản lý lớp</span>
              <span className="ms-auto">{openQLLop ? <FaChevronUp /> : <FaChevronDown />}</span>
            </>
          )}
        </div>
        {expanded && openQLLop && (
          <div className="sidebar-submenu ms-4">
            <Link to="/lop" className="sidebar-link">
              <FaLayerGroup className="me-1" /> Lớp
            </Link>
            <Link to="/loai-lop" className="sidebar-link">
              <FaBook className="me-1" /> Loại lớp
            </Link>
            <Link to="/chi-tiet-lop/:lopId" className="sidebar-link">
              <FaInfoCircle className="me-1" /> Thông tin lớp
            </Link>
          </div>
        )}

        <Link to="/hocvien" className="sidebar-link">
          <FaUsers /> {expanded && <span className="ms-2">Học viên</span>}
        </Link>
        <Link to="/khoa-hoc" className="sidebar-link">
          <FaBook /> {expanded && <span className="ms-2">Khóa học</span>}
        </Link>
        <Link to="/baocao" className="sidebar-link">
          <FaChartBar /> {expanded && <span className="ms-2">Báo cáo</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
