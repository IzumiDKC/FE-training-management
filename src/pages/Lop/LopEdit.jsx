import React, { useEffect, useState } from "react";
import { getLopById, updateLop } from "../../services/lopApi";
import { useParams, useNavigate } from "react-router";

const LopEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getLopById(id).then(setForm);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLop(id, form);
    navigate("/lop");
  };

  if (!form) return <div className="container mt-4">Đang tải...</div>;

  return (
    <div className="container mt-4">
      <h3>✏️ Sửa lớp học</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên lớp</label>
          <input className="form-control" name="tenLop" value={form.tenLop} onChange={handleChange} required />
        </div>
        <button className="btn btn-warning">Cập nhật</button>
      </form>
    </div>
  );
};

export default LopEdit;