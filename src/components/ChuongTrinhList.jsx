// File: src/components/ChuongTrinhList.jsx
import React, { useEffect, useState } from "react";
import { getAllChuongTrinh, deleteChuongTrinh } from "../services/chuongTrinhApi";
import { useNavigate } from "react-router";

const ChuongTrinhList = () => {
  const [chuongTrinhs, setChuongTrinhs] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getAllChuongTrinh();
    setChuongTrinhs(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      await deleteChuongTrinh(id);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <h3>📘 Chương trình đào tạo</h3>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/chuong-trinh/create")}>
        ➕ Thêm mới
      </button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Tên chương trình</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {chuongTrinhs.map((ct) => (
            <tr key={ct.chuongTrinhDaoTaoId}>
              <td>{ct.tenChuongTrinh}</td>
              <td>{ct.moTa}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/chuong-trinh/${ct.chuongTrinhDaoTaoId}`)}>Xem</button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/chuong-trinh/edit/${ct.chuongTrinhDaoTaoId}`)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ct.chuongTrinhDaoTaoId)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChuongTrinhList;
