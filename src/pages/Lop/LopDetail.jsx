import React, { useEffect, useState } from "react";
import { getLopById } from "../../services/lopApi";
import { useParams, useNavigate } from "react-router-dom";

const LopDetail = () => {
  const { id } = useParams();
  const [lop, setLop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLopById(id).then(setLop);
  }, [id]);

  if (!lop) return <div className="container mt-4">🔄 Đang tải thông tin lớp học...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📄 Thông tin lớp học</h4>
          <button
            className="btn btn-light btn-sm"
            onClick={() => navigate(`/chi-tiet-lop/${lop.lopId}`)}
          >
            📋 Xem buổi học
          </button>
        </div>
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">🆔 Tên lớp:</dt>
            <dd className="col-sm-9">{lop.tenLop}</dd>

            <dt className="col-sm-3">📘 Khóa học:</dt>
            <dd className="col-sm-9">{lop.khoaHocName}</dd>

            <dt className="col-sm-3">🏷️ Loại lớp:</dt>
            <dd className="col-sm-9">{lop.loaiLopName}</dd>

            <dt className="col-sm-3">⏱️ Số giờ:</dt>
            <dd className="col-sm-9">{lop.soGio} giờ ({lop.soGioQuyDoi} giờ quy đổi)</dd>

            <dt className="col-sm-3">📅 Thời gian học:</dt>
            <dd className="col-sm-9">
              {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} -{" "}
              {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default LopDetail;
