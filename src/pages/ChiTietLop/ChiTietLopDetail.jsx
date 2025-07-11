import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChiTietLopById } from "../../services/chiTietLopApi";
import useRole from "../../hooks/useRole";

const ChiTietLopDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    getChiTietLopById(id).then(setDetail);
  }, [id]);

  if (!detail) return <p>🔄 Đang tải chi tiết buổi học...</p>;

  return (
    <div className="container mt-4">
      <h3>📖 Chi tiết buổi học</h3>
      <div className="card">
        <div className="card-body">
          <p><strong>📅 Ngày học:</strong> {new Date(detail.ngayHoc).toLocaleDateString()}</p>
          <p><strong>🕘 Giờ bắt đầu:</strong> {detail.thoiGianBatDau?.substring(0, 5)}</p>
          <p><strong>🕚 Giờ kết thúc:</strong> {detail.thoiGianKetThuc?.substring(0, 5)}</p>
          <p><strong>👨‍🏫 Giảng viên:</strong> {detail.tenGiangVien || "Chưa phân công"}</p>
          <p><strong>🏫 Lớp:</strong> {detail.tenLop}</p>

          {(isAdmin || isGiangVien) && (
            <button
              className="btn btn-warning me-2"
              onClick={() => navigate(`/chi-tiet-lop/edit/${detail.chiTietLopId}`)}
            >
              ✏️ Chỉnh sửa
            </button>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/chi-tiet-lop/${detail.lopId}`)}
          >
            ⬅️ Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChiTietLopDetail;
