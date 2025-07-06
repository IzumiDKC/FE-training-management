import { createKhoaHoc } from "../../services/khoaHocApi";
import { useNavigate } from "react-router";
import React, { useState } from "react";

const KhoaHocCreate = () => {
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [chuongTrinhDaoTaoId, setChuongTrinhDaoTaoId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createKhoaHoc({
        tenKhoaHoc,
        chuongTrinhDaoTaoId: parseInt(chuongTrinhDaoTaoId),
      });
      navigate("/khoa-hoc");
    } catch (error) {
      alert("Lỗi khi tạo khóa học!");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Tạo mới Khóa học</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên khóa học</label>
          <input className="form-control" value={tenKhoaHoc} onChange={(e) => setTenKhoaHoc(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>ID Chương trình đào tạo</label>
          <input type="number" className="form-control" value={chuongTrinhDaoTaoId} onChange={(e) => setChuongTrinhDaoTaoId(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
};

export default KhoaHocCreate;
