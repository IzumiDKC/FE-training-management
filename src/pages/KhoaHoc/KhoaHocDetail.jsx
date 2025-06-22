// File: src/pages/KhoaHoc/KhoaHocDetail.jsx
import React, { useEffect, useState } from "react";
import { getKhoaHocById } from "../../services/khoaHocApi";
import { useParams } from "react-router-dom";

const KhoaHocDetail = () => {
  const { id } = useParams();
  const [khoaHoc, setKhoaHoc] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    getKhoaHocById(id)
      .then(setKhoaHoc)
      .catch((err) => {
        console.error("❌ Lỗi khi tải khóa học:", err);
        setError("Không tìm thấy hoặc lỗi khi tải khóa học.");
        setKhoaHoc(null);
      });
  }, [id]);

  if (error)
    return <div className="container mt-4 text-danger">⚠️ {error}</div>;

  if (!khoaHoc)
    return <div className="container mt-4">🔄 Đang tải thông tin khóa học...</div>;

  return (
    <div className="container mt-4">
      <h3>📘 Chi tiết Khóa học</h3>
      <p><strong>Mã:</strong> {khoaHoc.khoaHocId}</p>
      <p><strong>Tên:</strong> {khoaHoc.tenKhoaHoc}</p>
      <p><strong>Chương trình:</strong> {khoaHoc.chuongTrinhDaoTao?.tenChuongTrinh || "Không có"}</p>
    </div>
  );
};

export default KhoaHocDetail;
