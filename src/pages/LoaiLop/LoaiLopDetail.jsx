import React, { useEffect, useState } from "react";
import { getLoaiLopById } from "../../services/loaiLopApi";
import { useParams } from "react-router-dom";

const LoaiLopDetail = () => {
  const { id } = useParams();
  const [loaiLop, setLoaiLop] = useState(null);

  useEffect(() => {
    getLoaiLopById(id).then(setLoaiLop);
  }, [id]);

  if (!loaiLop) return <div className="container mt-4">Đang tải...</div>;

  return (
    <div className="container mt-4">
      <h3>📄 Chi tiết Loại lớp</h3>
      <p><strong>Mã:</strong> {loaiLop.loaiLopId}</p>
      <p><strong>Tên:</strong> {loaiLop.tenLoaiLop}</p>
    </div>
  );
};

export default LoaiLopDetail;