import React, { useEffect, useState } from "react";
import { getAllKhoaHoc, deleteKhoaHoc } from "../services/khoaHocApi";
import { useNavigate } from "react-router";

const KhoaHocList = () => {
  const [khoaHocs, setKhoaHocs] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getAllKhoaHoc();
      setKhoaHocs(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khóa học:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này?")) {
      try {
        await deleteKhoaHoc(id);
        fetchData();
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  return (
    <div>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Tên khóa học</th>
            <th>Chương trình ĐT</th>
            <th>Lớp</th>
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
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => navigate(`/khoa-hoc/${kh.khoaHocId}`)}
                >
                  Xem
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/khoa-hoc/edit/${kh.khoaHocId}`)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-sm btn-danger"
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

export default KhoaHocList;
