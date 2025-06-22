import React, { useEffect, useState } from "react";
import { getAllKhoaHoc, deleteKhoaHoc } from "../../services/khoaHocApi";
import { Link, useNavigate } from "react-router-dom";

const KhoaHocPage = () => {
  const [khoaHocs, setKhoaHocs] = useState([]);
  // eslint-disable-next-line
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getAllKhoaHoc();
      setKhoaHocs(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này?")) {
      try {
        await deleteKhoaHoc(id);
        fetchData(); // reload
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📘 Danh sách Khóa học</h2>
        <Link to="/khoa-hoc/create" className="btn btn-success">
          ➕ Tạo mới
        </Link>
      </div>

      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Tên khóa học</th>
            <th>Chương trình đào tạo</th>
            <th>Lớp học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {khoaHocs.map((kh) => (
            <tr key={kh.khoaHocId}>
              <td>{kh.tenKhoaHoc}</td>
              <td>{kh.chuongTrinhDaoTao?.tenChuongTrinh || "—"}</td>
              <td>
                {kh.lops && kh.lops.length > 0 ? (
                  <ul className="mb-0 ps-3">
                    {kh.lops.map((lop) => (
                      <li key={lop.lopId}>
                        <strong>{lop.tenLop}</strong> (
                        {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} -{" "}
                        {new Date(lop.ngayKetThucDuKien).toLocaleDateString()})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted">Chưa có lớp</span>
                )}
              </td>
              <td>
                <Link
                  to={`/khoa-hoc/detail/${kh.khoaHocId}`}
                  className="btn btn-secondary btn-sm me-2"
                >
                  Xem
                </Link>
                <Link
                  to={`/khoa-hoc/edit/${kh.khoaHocId}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Sửa
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(kh.khoaHocId)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KhoaHocPage;
