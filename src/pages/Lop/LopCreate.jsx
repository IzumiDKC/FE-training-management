import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createLop } from "../../services/lopApi";
import { getAllKhoaHoc } from "../../services/khoaHocApi";
import { getAllLoaiLop } from "../../services/loaiLopApi";
import { formatDateTimeLocal, calculateSoGio } from "../../utils/timeUtils";
import "./LopCreate.css";
import { FaChalkboardTeacher } from 'react-icons/fa';

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

  if (name === "ngayBatDauDuKien" || name === "ngayKetThucDuKien") {
    setUserModifiedSoGio(false); // reset để cho phép tính lại tự động
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
    <div className="lop-create-wrapper">
      {/* Modern Background */}
      <div className="modern-background">
        <div className="gradient-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 3 + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="page-header">
        <div className="container header-container">
          <button
            className="back-btn"
            onClick={() => navigate("/lop")}
            type="button"
          >
            <span className="back-icon">←</span>
            <span className="back-text">Quay lại</span>
          </button>
          <div className="header-title">
            <div className="title-icon">
              <span className="icon">🎓</span>
            </div>
            <div className="title-content">
              <h1>Tạo lớp mới</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container content-container">
          <div className="form-card">
            <div className="card-header-h">
              <div className="header-info">
                <h2>
                  <FaChalkboardTeacher style={{ marginRight: '0.5rem', color: 'white', fontSize: '2rem'}} />
                  Thông tin lớp học
                </h2>
              </div>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit} className="create-form">
                {/* Basic Information Section */}
                <div className="form-section">
                  <h3 className="section-title">
                    <span className="section-icon">ℹ️</span>
                    Thông tin cơ bản
                  </h3>

                  <div className="form-group">
                    <label className="input-label">
                      <span className="label-icon">📝</span>
                      <span className="label-text">Tên lớp <span className="required">*</span></span>
                    </label>
                    <div className="input-container">
                      <input
                        className="form-input"
                        name="tenLop"
                        onChange={handleChange}
                        required
                        placeholder="Nhập tên lớp học..."
                      />
                      <div className="input-focus-border"></div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">
                        <span className="label-icon">📅</span>
                        <span className="label-text">Khóa học <span className="required">*</span></span>
                      </label>
                      <div className="select-container">
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
                        <div className="select-arrow">▼</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="input-label">
                        <span className="label-icon">🏷️</span>
                        <span className="label-text">Loại lớp <span className="required">*</span></span>
                      </label>
                      <div className="select-container">
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
                        <div className="select-arrow">▼</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Information Section */}
                <div className="form-section">
                  <h3 className="section-title">
                    <span className="section-icon">⏰</span>
                    Thời gian học
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">
                        <span className="label-icon">📅</span>
                        <span className="label-text">Ngày, giờ bắt đầu <span className="required">*</span></span>
                      </label>
                      <div className="input-container">
                        <input
                          type="datetime-local"
                          className="form-input"
                          name="ngayBatDauDuKien"
                          value={form.ngayBatDauDuKien}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-focus-border"></div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="input-label">
                        <span className="label-icon">📅</span>
                        <span className="label-text">Ngày, giờ kết thúc <span className="required">*</span></span>
                      </label>
                      <div className="input-container">
                        <input
                          type="datetime-local"
                          className="form-input"
                          name="ngayKetThucDuKien"
                          value={form.ngayKetThucDuKien}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-focus-border"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">
                        <span className="label-icon">⏱️</span>
                        <span className="label-text">Số giờ <span className="required">*</span></span>
                      </label>
                      <div className="input-container">
                        <input
                          type="number"
                          name="soGio"
                          className="form-input"
                          value={form.soGio}
                          onChange={handleChange}
                          min={0}
                          step={0.5}
                          required
                          placeholder="0"
                        />
                        <div className="input-focus-border"></div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="input-label">
                        <span className="label-icon">🎯</span>
                        <span className="label-text">Số giờ quy đổi / Điểm đào tạo <span className="required">*</span></span>
                      </label>
                      <div className="input-container">
                        <input
                          type="number"
                          name="soGioQuyDoi"
                          className="form-input"
                          value={form.soGioQuyDoi}
                          onChange={handleChange}
                          min={0}
                          required
                          placeholder="0"
                        />
                        <div className="input-focus-border"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options Section */}
                <div className="form-section">
                  <h3 className="section-title">
                    <span className="section-icon">⚙️</span>
                    Tùy chọn
                  </h3>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        className="checkbox-input"
                        type="checkbox"
                        name="coDanhSachHocVien"
                        checked={form.coDanhSachHocVien}
                        onChange={handleChange}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="checkbox-text">
                        <span className="checkbox-icon">👥</span>
                        Thêm học viên ngay sau khi tạo lớp
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={() => navigate("/lop")}
                  >
                    <span className="btn-icon">✕</span>
                    <span>Hủy</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-save"
                  >
                    <span className="btn-icon">💾</span>
                    <span>Lưu</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LopCreate;


