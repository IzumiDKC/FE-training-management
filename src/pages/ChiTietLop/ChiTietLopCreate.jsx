import React, { useEffect, useState } from "react";
import { createChiTietLop, getAllGiangVien } from "../../services/chiTietLopApi";
import { useNavigate, useParams } from "react-router-dom";

const ChiTietLopCreate = () => {
  const { lopId } = useParams();
  const [form, setForm] = useState({
    ngayHoc: new Date().toISOString().slice(0, 10),
    thoiGianBatDau: "07:00:00",
    thoiGianKetThuc: "11:00:00",
    lopId: parseInt(lopId),
    giangVienId: "" // "" mặc định là không chọn
  });
  const [giangViens, setGiangViens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllGiangVien().then(setGiangViens);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nếu không chọn giảng viên, đặt giangVienId là null
    const payload = {
      ...form,
      giangVienId: form.giangVienId === "" ? null : parseInt(form.giangVienId)
    };

    try {
      await createChiTietLop(payload);
      navigate(`/chi-tiet-lop/${lopId}`);
    } catch (error) {
      console.error("Lỗi khi tạo buổi học:", error);
      alert("❌ Tạo buổi học thất bại!");
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Thêm buổi học cho lớp #{lopId}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ngày học</label>
          <input
            type="date"
            className="form-control"
            name="ngayHoc"
            value={form.ngayHoc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Thời gian bắt đầu</label>
          <input
            type="time"
            className="form-control"
            name="thoiGianBatDau"
            value={form.thoiGianBatDau}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Thời gian kết thúc</label>
          <input
            type="time"
            className="form-control"
            name="thoiGianKetThuc"
            value={form.thoiGianKetThuc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giảng viên (có thể bỏ trống)</label>
          <select
            className="form-select"
            name="giangVienId"
            value={form.giangVienId}
            onChange={handleChange}
          >
            <option value="">-- Không phân công giảng viên --</option>
            {giangViens.map((gv) => (
              <option key={gv.giangVienId} value={gv.giangVienId}>
                {gv.hoTen}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
};

export default ChiTietLopCreate;
