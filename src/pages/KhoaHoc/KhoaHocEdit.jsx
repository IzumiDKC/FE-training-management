// File: src/pages/KhoaHoc/KhoaHocEdit.jsx
import React, { useEffect, useState } from "react";
import { getKhoaHocById, updateKhoaHoc } from "../../services/khoaHocApi";
import { getAllChuongTrinh } from "../../services/chuongTrinhApi";
import { useParams, useNavigate } from "react-router";

const KhoaHocEdit = () => {
  const { id } = useParams();
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [chuongTrinhDaoTaoId, setChuongTrinhDaoTaoId] = useState("");
  const [chuongTrinhOptions, setChuongTrinhOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const khoaHoc = await getKhoaHocById(id);
        const chuongTrinhs = await getAllChuongTrinh();

        setTenKhoaHoc(khoaHoc.tenKhoaHoc);
        setChuongTrinhDaoTaoId(khoaHoc.chuongTrinhDaoTao?.chuongTrinhDaoTaoId || "");
        setChuongTrinhOptions(chuongTrinhs);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateKhoaHoc(id, {
        khoaHocId: parseInt(id),
        tenKhoaHoc,
        chuongTrinhDaoTaoId: parseInt(chuongTrinhDaoTaoId),
      });
      navigate("/khoa-hoc");
    } catch (error) {
      alert("Lỗi khi cập nhật khóa học!");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Cập nhật Khóa học</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên khóa học</label>
          <input
            className="form-control"
            value={tenKhoaHoc}
            onChange={(e) => setTenKhoaHoc(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Chương trình đào tạo</label>
          <select
            className="form-select"
            value={chuongTrinhDaoTaoId}
            onChange={(e) => setChuongTrinhDaoTaoId(e.target.value)}
            required
          >
            {chuongTrinhOptions.map((ct) => (
              <option key={ct.chuongTrinhDaoTaoId} value={ct.chuongTrinhDaoTaoId}>
                {ct.tenChuongTrinh}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-warning">Cập nhật</button>
      </form>
    </div>
  );
};

export default KhoaHocEdit;
