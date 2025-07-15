import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createLop } from "../../services/lopApi";
import { getAllKhoaHoc } from "../../services/khoaHocApi";
import { getAllLoaiLop } from "../../services/loaiLopApi";
import { formatDateTimeLocal, calculateSoGio } from "../../utils/timeUtils";

const LopCreate = () => {
  const navigate = useNavigate();

  const defaultStart = new Date();
  defaultStart.setHours(7, 0, 0, 0);

  const defaultEnd = new Date(defaultStart.getTime() + 30 * 24 * 60 * 60 * 1000);
  defaultEnd.setHours(17, 0, 0, 0);

  const [form, setForm] = useState({
    tenLop: "",
    ngayBatDauDuKien: formatDateTimeLocal(defaultStart),
    ngayKetThucDuKien: formatDateTimeLocal(defaultEnd),
    soGio: calculateSoGio(defaultStart.toISOString(), defaultEnd.toISOString()),
    soGioQuyDoi: 0,
    coDanhSachHocVien: false,
    khoaHocId: "",
    loaiLopId: "",
  });

  const [userModifiedSoGio, setUserModifiedSoGio] = useState(false);
  const [khoaHocs, setKhoaHocs] = useState([]);
  const [loaiLops, setLoaiLops] = useState([]);

  useEffect(() => {
    getAllKhoaHoc().then(setKhoaHocs);
    getAllLoaiLop().then(setLoaiLops);
  }, []);

  useEffect(() => {
  const newSoGio = calculateSoGio(form.ngayBatDauDuKien, form.ngayKetThucDuKien);
  setForm((prev) => ({
    ...prev,
    soGio: userModifiedSoGio ? prev.soGio : newSoGio,
  }));
}, [form.ngayBatDauDuKien, form.ngayKetThucDuKien, userModifiedSoGio]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "soGio") {
      setUserModifiedSoGio(true);
    }

    const parsedValue =
      type === "checkbox"
        ? checked
        : name.includes("Id")
        ? parseInt(value) || ""
        : name === "soGio" || name === "soGioQuyDoi"
        ? parseFloat(value)
        : value;

    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(form.ngayBatDauDuKien);
    const end = new Date(form.ngayKetThucDuKien);

    if (end <= start) {
      alert("❌ Ngày kết thúc phải sau ngày bắt đầu!");
      return;
    }

    if (!form.khoaHocId || !form.loaiLopId) {
      alert("Vui lòng chọn đầy đủ khóa học và loại lớp.");
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
          <label className="form-label">Số giờ</label>
          <input
            type="number"
            name="soGio"
            className="form-control"
            value={form.soGio}
            onChange={handleChange}
            min={0}
            step={0.5}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số giờ quy đổi / Điểm đào tạo</label>
          <input
            type="number"
            name="soGioQuyDoi"
            className="form-control"
            value={form.soGioQuyDoi}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="coDanhSachHocVien"
            checked={form.coDanhSachHocVien}
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


