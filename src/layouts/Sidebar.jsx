import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers, FaBook, FaChartBar, FaBars, FaHome } from "react-icons/fa";
import { useSidebar } from "../contexts/SidebarContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { expanded, setExpanded } = useSidebar();

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
        <Link to="/" className="sidebar-link"><FaHome /> {expanded && <span className="ms-2">Trang chủ</span>}</Link>
        <Link to="/lop" className="sidebar-link"><FaChalkboardTeacher /> {expanded && <span className="ms-2">Quản lý lớp</span>}</Link>
        <Link to="/hocvien" className="sidebar-link"><FaUsers /> {expanded && <span className="ms-2">Học viên</span>}</Link>
        <Link to="/khoa-hoc" className="sidebar-link"><FaBook /> {expanded && <span className="ms-2">Khóa học</span>}</Link>
        <Link to="/baocao" className="sidebar-link"><FaChartBar /> {expanded && <span className="ms-2">Báo cáo</span>}</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
