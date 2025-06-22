import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChuongTrinh } from "../../services/chuongTrinhApi";

const ChuongTrinhCreate = () => {
  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [moTa, setMoTa] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChuongTrinh({ tenChuongTrinh, moTa });
      navigate("/chuong-trinh");
    } catch (error) {
      alert("Lỗi khi tạo chương trình!");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Tạo mới Chương trình</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên chương trình</label>
          <input
            className="form-control"
            value={tenChuongTrinh}
            onChange={(e) => setTenChuongTrinh(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mô tả</label>
          <textarea
            className="form-control"
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
};

export default ChuongTrinhCreate;