import React, { useEffect, useState } from "react";
import { getLopById } from "../../services/lopApi";
import { useParams } from "react-router-dom";

const LopDetail = () => {
  const { id } = useParams();
  const [lop, setLop] = useState(null);

  useEffect(() => {
    getLopById(id).then(setLop);
  }, [id]);

  if (!lop) return <div className="container mt-4">Đang tải...</div>;

  return (
    <div className="container mt-4">
      <h3>📄 Thông tin lớp học</h3>
      <p><strong>Tên:</strong> {lop.tenLop}</p>
      <p><strong>Khóa học:</strong> {lop.khoaHocName}</p>
      <p><strong>Loại lớp:</strong> {lop.loaiLopName}</p>
      <p><strong>Số giờ:</strong> {lop.soGio} ({lop.soGioQuyDoi} quy đổi)</p>
      <p><strong>Thời gian:</strong> {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} - {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}</p>
    </div>
  );
};

export default LopDetail;
