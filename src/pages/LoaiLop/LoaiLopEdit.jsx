import React, { useEffect, useState } from "react";
import { getLoaiLopById, updateLoaiLop } from "../../services/loaiLopApi";
import { useParams, useNavigate } from "react-router-dom";

const LoaiLopEdit = () => {
  const { id } = useParams();
  const [tenLoaiLop, setTenLoaiLop] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getLoaiLopById(id).then((data) => setTenLoaiLop(data.tenLoaiLop));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLoaiLop(id, { loaiLopId: parseInt(id), tenLoaiLop });
      navigate("/loai-lop");
    } catch (error) {
      alert("Lỗi khi cập nhật");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Cập nhật Loại lớp</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên loại lớp</label>
          <input className="form-control" value={tenLoaiLop} onChange={(e) => setTenLoaiLop(e.target.value)} required />
        </div>
        <button className="btn btn-warning">Cập nhật</button>
      </form>
    </div>
  );
};

export default LoaiLopEdit;