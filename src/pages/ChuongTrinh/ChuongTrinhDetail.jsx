import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getChuongTrinhById } from "../../services/chuongTrinhApi";

const ChuongTrinhDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getChuongTrinhById(id).then(setItem).catch(console.error);
  }, [id]);

  if (!item) return <div className="text-center mt-5">🔄 Đang tải...</div>;

  return (
    <div className="container mt-4">
      <h3>🔎 Chi tiết Chương trình</h3>
      <p><strong>Tên chương trình:</strong> {item.tenChuongTrinh}</p>
      <p><strong>Mô tả:</strong> {item.moTa || "(Không có mô tả)"}</p>
      <p><strong>Số khóa học:</strong> {item.khoaHocs?.length || 0}</p>
    </div>
  );
};

export default ChuongTrinhDetail;