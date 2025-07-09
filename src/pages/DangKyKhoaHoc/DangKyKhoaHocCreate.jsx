// src/pages/DangKyKhoaHoc/DangKyKhoaHocCreate.jsx
import React, { useEffect, useState } from "react";
import { getAllKhoaHoc, getLopByKhoaHoc, createDangKy } from "../../services/dangKyApi";
import { useNavigate } from "react-router";

const DangKyKhoaHocCreate = () => {
  const [khoaHocs, setKhoaHocs] = useState([]);
  const [lops, setLops] = useState([]);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState("");
  const [selectedLop, setSelectedLop] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllKhoaHoc().then(setKhoaHocs);
  }, []);

  useEffect(() => {
    if (selectedKhoaHoc) {
      getLopByKhoaHoc(selectedKhoaHoc).then(setLops);
    }
  }, [selectedKhoaHoc]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedKhoaHocId = parseInt(selectedKhoaHoc);
    const parsedLopId = parseInt(selectedLop);

    if (isNaN(parsedKhoaHocId) || isNaN(parsedLopId)) {
      alert("Vui lòng chọn khóa học và lớp hợp lệ.");
      return;
    }

    const payload = {
      khoaHocId: parsedKhoaHocId,
      lopId: parsedLopId,
    };

    try {
      await createDangKy(payload);
      alert("✅ Đăng ký thành công!");
      navigate("/");
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      alert("Đăng ký thất bại: " + (err?.response?.data || err.message));
    }
  };



  return (
    <div className="container mt-4">
      <h3>📝 Đăng ký khóa học</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Khóa học</label>
          <select
            className="form-select"
            value={selectedKhoaHoc}
            onChange={(e) => setSelectedKhoaHoc(e.target.value)} // string
            required
          >
            <option value="">-- Chọn khóa học --</option>
            {khoaHocs.map((k) => (
              <option key={k.khoaHocId} value={k.khoaHocId}>
                {k.tenKhoaHoc}
              </option>
            ))}
          </select>

        </div>
        <div className="mb-3">
          <label>Lớp</label>
          <select
            className="form-select"
            value={selectedLop}
            onChange={(e) => setSelectedLop(e.target.value)}
            required
          >
            <option value="">-- Chọn lớp --</option>
            {lops.map((l) => (
              <option key={l.lopId} value={l.lopId}>
                {l.tenLop}
              </option>
            ))}
          </select>

        </div>
        <button type="submit" className="btn btn-primary">
          ✅ Xác nhận đăng ký
        </button>
      </form>
    </div>
  );
};

export default DangKyKhoaHocCreate;
