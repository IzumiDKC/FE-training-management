import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/api"; 
import { FaUserCircle, FaGraduationCap } from "react-icons/fa";
import "./Navbar.css";
const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await api.post("/account/logout"); 
    logout();                      
    navigate("/login");
  } catch (err) {
    alert("Đăng xuất thất bại");
    console.error(err);
  }
};

  return (
    <nav className="navbar-custom">
      <div className="navbar-inner container-fluid d-flex align-items-center justify-content-between py-2">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/" style={{ textDecoration: "none" }}>
          <span className="navbar-logo-bg">
            <FaGraduationCap size={24} className="navbar-logo-icon" />
          </span>
          <span className="navbar-logo-text">
            Đào Tạo
          </span>
        </Link>
        <div className="ms-auto d-flex align-items-center gap-3">
          {/* {isAdmin && (
            <div className="dropdown me-2">
              <button className="btn btn-light border-0 d-flex align-items-center gap-2 dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <FaCogs style={{ color: "#2563eb" }} /> Quản lý
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/chuong-trinh">Chương Trình</Link></li>
                <li><Link className="dropdown-item" to="/khoa-hoc">Khóa học</Link></li>
                <li><Link className="dropdown-item" to="/lop">Lớp học</Link></li>
                <li><Link className="dropdown-item" to="/loai-lop">Loại lớp</Link></li>
              </ul>
            </div>
          )} */}

          {!currentUser ? (
            <>
              <Link to="/login" className="btn btn-outline-primary">Đăng nhập</Link>
              <Link to="/register" className="btn btn-primary">Đăng ký</Link>
            </>
          ) : (
            <div className="dropdown">
              <button className="btn btn-light border-0 d-flex align-items-center gap-2 dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <FaUserCircle size={22} style={{ color: "#2563eb" }} /> {currentUser.hoTen}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Thông tin cá nhân</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;