import React, { useState } from "react";
import { createLoaiLop } from "../../services/loaiLopApi";
import { useNavigate } from "react-router-dom";

const LoaiLopCreate = () => {
  const [tenLoaiLop, setTenLoaiLop] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLoaiLop({ tenLoaiLop });
      navigate("/loai-lop");
    } catch (error) {
      alert("Lỗi khi tạo loại lớp");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Thêm Loại lớp</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên loại lớp</label>
          <input className="form-control" value={tenLoaiLop} onChange={(e) => setTenLoaiLop(e.target.value)} required />
        </div>
        <button className="btn btn-success">Lưu</button>
      </form>
    </div>
  );
};

export default LoaiLopCreate;