import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaChalkboardTeacher, FaUsers, FaBook, FaChartBar, FaBars, FaHome, FaChevronDown, FaChevronUp, FaLayerGroup, FaClipboardList, FaEdit, FaTasks, FaStar } from "react-icons/fa";
import { useSidebar } from "../contexts/SidebarContext";
import useRole from "../hooks/useRole";

const Sidebar = () => {
  const { expanded, setExpanded } = useSidebar();
  const [openQLLop, setOpenQLLop] = useState(false);
  const [openKhoaHoc, setOpenKhoaHoc] = useState(false);
  const [openDanhGia, setOpenDanhGia] = useState(false);

  const { isAdmin, isGiangVien, isAuthenticated } = useRole();

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

        <Link to="/chuong-trinh" className="sidebar-link">
          <FaBook /> {expanded && <span className="ms-2">Chương Trình Đào Tạo</span>}
        </Link>

        {/* Dropdown: Khóa học */}
        <div
          className={`sidebar-link sidebar-dropdown ${openKhoaHoc ? "open" : ""}`}
          onClick={() => setOpenKhoaHoc((v) => !v)}
          style={{ cursor: "pointer" }}
        >
          <FaTasks />
          {expanded && (
            <>
              <span className="ms-2">Khóa học</span>
              <span className="ms-auto">{openKhoaHoc ? <FaChevronUp /> : <FaChevronDown />}</span>
            </>
          )}
        </div>

        {expanded && openKhoaHoc && (
          <div className="sidebar-submenu ms-4">
            {/* Luôn hiển thị */}
            <Link to="/khoa-hoc" className="sidebar-link">
              <FaBook className="me-1" /> Danh sách khóa học
            </Link>

            {/* Chỉ cho Giảng viên hoặc Admin */}
            {(isAdmin || isGiangVien) && (
              <Link to="/dang-ky-khoa-hoc" className="sidebar-link">
                <FaClipboardList className="me-1" /> Xem đăng ký
              </Link>
            )}

            {/* Chỉ cần đăng nhập */}
            {isAuthenticated && (
              <Link to="/dang-ky-khoa-hoc/create" className="sidebar-link">
                <FaEdit className="me-1" /> Đăng ký khóa học
              </Link>
            )}
          </div>
        )}

        {/* LOGIN */}
        {isAuthenticated && (
          <>
            <div
              className={`sidebar-link sidebar-dropdown ${openQLLop ? "open" : ""}`}
              onClick={() => setOpenQLLop((v) => !v)}
              style={{ cursor: "pointer" }}
            >
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
              </div>
            )}

            {(isAdmin || isGiangVien) && (
              <>
                <div
                  className={`sidebar-link sidebar-dropdown evaluation-dropdown ${openDanhGia ? "open" : ""}`}
                  onClick={() => setOpenDanhGia((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  <FaStar />
                  {expanded && (
                    <>
                      <span className="ms-2">Đánh Giá Học Viên</span>
                      <span className="ms-auto">
                        {openDanhGia ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </>
                  )}
                </div>

                {expanded && openDanhGia && (
                  <div className="sidebar-submenu evaluation-submenu ms-4">
                    <Link to="/danh-gia" className="sidebar-link evaluation-link">
                      <FaClipboardList className="me-1" /> Xem đánh giá
                    </Link>
                    {/* <Link to="/danh-gia/create" className="sidebar-link evaluation-link">
                      <FaEdit className="me-1" /> Tạo đánh giá
                    </Link> */}
                  </div>
                )}
              </>
            )}

            {/* ADMIN */}
            {isAdmin && (
              <>
                <Link to="/admin/user-list" className="sidebar-link">
                  <FaUsers /> {expanded && <span className="ms-2">DS Tài Khoản</span>}
                </Link>
                <Link to="/baocao" className="sidebar-link">
                  <FaChartBar /> {expanded && <span className="ms-2">Báo cáo</span>}
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
