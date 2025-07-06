import React, { useEffect, useState } from "react";
import { getAllLoaiLop, deleteLoaiLop } from "../services/loaiLopApi";
import { useNavigate } from "react-router";

const LoaiLopList = () => {
  const [loaiLops, setLoaiLops] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getAllLoaiLop();
      setLoaiLops(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📋 Danh sách Loại lớp</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/loai-lop/create")}
        >
          ➕ Thêm mới
        </button>
      </div>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Tên loại lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loaiLops.map((l) => (
            <tr key={l.loaiLopId}>
              <td>{l.tenLoaiLop}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/loai-lop/${l.loaiLopId}`)}>Xem</button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/loai-lop/e/${l.loaiLopId}`)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(l.loaiLopId)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoaiLopList;