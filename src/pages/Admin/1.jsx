import React, { useEffect, useState } from "react";
import { getPagedUsers, changeUserRole } from "../../services/adminApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processingUserId, setProcessingUserId] = useState("");

  const loadUsers = async (currentPage) => {
    setLoading(true);
    try {
      const res = await getPagedUsers(currentPage);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Lỗi khi tải người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const handleChangeRole = async (userId) => {
    if (!window.confirm("Bạn có chắc muốn chuyển vai trò người dùng này?")) return;
    setProcessingUserId(userId);
    try {
      await changeUserRole(userId);
      await loadUsers(page); 
    } catch (err) {
      alert("Lỗi khi chuyển vai trò!");
      console.error(err);
    } finally {
      setProcessingUserId("");
    }
  };

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn btn-sm mx-1 ${i === page ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="mt-3 text-center">
        <button
          className="btn btn-sm btn-outline-secondary me-2"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          &laquo;
        </button>
        {buttons}
        <button
          className="btn btn-sm btn-outline-secondary ms-2"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h3>👥 Danh sách tài khoản</h3>
      {loading ? (
        <div className="mt-3">🔄 Đang tải người dùng...</div>
      ) : (
        <>
          <table className="table table-bordered table-hover mt-3">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số CCCD</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Không có người dùng nào.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.userId}>
                    <td>{(page - 1) * 10 + index + 1}</td>
                    <td>{user.hoTen}</td>
                    <td>{user.email}</td>
                    <td>{user.soCanCuoc || <em className="text-muted">Chưa có</em>}</td>
                    <td>
                      <span className="badge bg-primary">{user.role}</span>
                    </td>
                    <td>
                      {user.role !== "Admin" ? (
                        <button
                          className="btn btn-sm btn-warning"
                          disabled={processingUserId === user.userId}
                          onClick={() => handleChangeRole(user.userId)}
                        >
                          {processingUserId === user.userId ? "Đang xử lý..." : "Chuyển vai trò"}
                        </button>
                      ) : (
                        <span className="text-muted">--</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default UserList;
