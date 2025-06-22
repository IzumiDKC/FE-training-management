import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChuongTrinhById, updateChuongTrinh } from "../../services/chuongTrinhApi";

const ChuongTrinhEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ tenChuongTrinh: "", moTa: "" });
  const navigate = useNavigate();

  useEffect(() => {
    getChuongTrinhById(id).then(setForm).catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateChuongTrinh(id, form);
    navigate("/chuongtrinh");
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Chỉnh sửa Chương trình</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên chương trình</label>
          <input
            className="form-control"
            name="tenChuongTrinh"
            value={form.tenChuongTrinh}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mô tả</label>
          <textarea
            className="form-control"
            name="moTa"
            value={form.moTa}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default ChuongTrinhEdit;