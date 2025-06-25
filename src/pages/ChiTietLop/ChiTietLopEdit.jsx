import React, { useEffect, useState } from "react";
import { getChiTietLopById, updateChiTietLop, getAllGiangVien } from "../../services/chiTietLopApi";
import { useNavigate, useParams } from "react-router-dom";

const ChiTietLopEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [giangViens, setGiangViens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getChiTietLopById(id).then(setForm);
    getAllGiangVien().then(setGiangViens);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "giangVienId" && value === "" ? null : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateChiTietLop(id, form);
    navigate(`/chi-tiet-lop/${form.lopId}`);
  };

  if (!form) return <p>🔄 Đang tải thông tin...</p>;

  return (
    <div className="container mt-4">
      <h3>✏️ Cập nhật buổi học</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
  <label className="form-label">📅 Ngày học</label>
  <input
    type="date"
    className="form-control"
    name="ngayHoc"
    value={form.ngayHoc?.substring(0, 10)}
    onChange={handleChange}
    required
  />
</div>


        <div className="mb-3">
          <label className="form-label">🕖 Thời gian bắt đầu</label>
          <input type="time" className="form-control" name="thoiGianBatDau" value={form.thoiGianBatDau} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">🕔 Thời gian kết thúc</label>
          <input type="time" className="form-control" name="thoiGianKetThuc" value={form.thoiGianKetThuc} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">👨‍🏫 Giảng viên (tùy chọn)</label>
          <select className="form-select" name="giangVienId" value={form.giangVienId || ""} onChange={handleChange}>
            <option value="">-- Không chọn giảng viên --</option>
            {giangViens.map(gv => (
              <option key={gv.giangVienId} value={gv.giangVienId}>
                {gv.hoTen}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">💾 Cập nhật</button>
      </form>
    </div>
  );
};

export default ChiTietLopEdit;
