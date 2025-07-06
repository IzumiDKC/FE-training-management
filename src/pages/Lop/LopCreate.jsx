import React, { useEffect, useState } from "react";
import { createLop } from "../../services/lopApi";
import { getAllKhoaHoc } from "../../services/khoaHocApi";
import { getAllLoaiLop } from "../../services/loaiLopApi";
import { useNavigate } from "react-router";

const formatDateTimeLocal = (date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};

const LopCreate = () => {
  const defaultStart = new Date();
  defaultStart.setHours(7, 0, 0, 0);

  const defaultEnd = new Date(defaultStart.getTime() + 30 * 24 * 60 * 60 * 1000);
  defaultEnd.setHours(17, 0, 0, 0);

  const [form, setForm] = useState({
    tenLop: "",
    ngayBatDauDuKien: formatDateTimeLocal(defaultStart),
    ngayKetThucDuKien: formatDateTimeLocal(defaultEnd),
    soGio: 0,
    soGioQuyDoi: 0,
    coDanhSachHocVien: false,
    khoaHocId: "",
    loaiLopId: "",
  });

  const [khoaHocs, setKhoaHocs] = useState([]);
  const [loaiLops, setLoaiLops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllKhoaHoc().then(setKhoaHocs);
    getAllLoaiLop().then(setLoaiLops);
  }, []);

  useEffect(() => {
    const start = new Date(form.ngayBatDauDuKien);
    const end = new Date(form.ngayKetThucDuKien);
    if (end > start) {
      const hoursPerDay =
        end.getHours() + end.getMinutes() / 60 -
        (start.getHours() + start.getMinutes() / 60);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const total = hoursPerDay * days;
      setForm((prev) => ({ ...prev, soGio: total }));
    }
  }, [form.ngayBatDauDuKien, form.ngayKetThucDuKien]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsedValue =
      type === "checkbox"
        ? checked
        : name.includes("Id")
        ? parseInt(value) || ""
        : value;
    setForm({ ...form, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.khoaHocId || !form.loaiLopId) {
      alert("Vui lòng chọn đầy đủ khóa học và loại lớp.");
      return;
    }

    const start = new Date(form.ngayBatDauDuKien);
    const end = new Date(form.ngayKetThucDuKien);
    if (end <= start) {
      alert("❌ Ngày kết thúc phải sau ngày bắt đầu!");
      return;
    }

    try {
      const response = await createLop(form);
      const id = response.lopId || response.id || response.LopId;
      if (form.coDanhSachHocVien) {
        navigate(`/lop/chon-hoc-vien/${id}`);
      } else {
        navigate("/lop");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo lớp học!");
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Tạo lớp mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên lớp</label>
          <input className="form-control" name="tenLop" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày, giờ bắt đầu</label>
          <input
            type="datetime-local"
            className="form-control"
            name="ngayBatDauDuKien"
            value={form.ngayBatDauDuKien}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày, giờ kết thúc</label>
          <input
            type="datetime-local"
            className="form-control"
            name="ngayKetThucDuKien"
            value={form.ngayKetThucDuKien}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số giờ (tự tính)</label>
          <input
            type="number"
            className="form-control"
            value={form.soGio.toFixed(2)}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số giờ quy đổi</label>
          <input
            type="number"
            className="form-control"
            name="soGioQuyDoi"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="coDanhSachHocVien"
            onChange={handleChange}
          />
          <label className="form-check-label">Thêm học viên ngay?</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Khóa học</label>
          <select
            className="form-select"
            name="khoaHocId"
            value={form.khoaHocId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn khóa học --</option>
            {khoaHocs.map((kh) => (
              <option key={kh.khoaHocId} value={kh.khoaHocId}>
                {kh.tenKhoaHoc}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Loại lớp</label>
          <select
            className="form-select"
            name="loaiLopId"
            value={form.loaiLopId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn loại lớp --</option>
            {loaiLops.map((ll) => (
              <option key={ll.loaiLopId} value={ll.loaiLopId}>
                {ll.tenLoaiLop}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
};

export default LopCreate;
