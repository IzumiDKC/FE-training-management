import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("https://localhost:7247/api/account/logout", {}, { withCredentials: true });
    setCurrentUser(null);
    navigate("/login");
  };

  const isAdmin = currentUser?.roles?.includes("Admin",);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand fw-bold text-primary" to="/">
        🎓 Đào Tạo
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {isAdmin && (
          <div className="dropdown me-2">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🛠️ Quản lý
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {/* <li><Link className="dropdown-item" to="/admin/users">Người dùng</Link></li> */}
              <li><Link className="dropdown-item" to="/chuong-trinh">Chương Trình</Link></li>
              <li><Link className="dropdown-item" to="/khoa-hoc">Khóa học</Link></li>
              <li><Link className="dropdown-item" to="/lop">Lớp học</Link></li>
              <li><Link className="dropdown-item" to="/loai-lop">Loại lớp</Link></li>
            </ul>
          </div>
        )}

        {!currentUser ? (
          <>
            <Link to="/login" className="btn btn-outline-primary">Đăng nhập</Link>
            <Link to="/register" className="btn btn-primary">Đăng ký</Link>
          </>
        ) : (
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              👤 {currentUser.hoTen}
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
    </nav>
  );
};

export default Navbar;
