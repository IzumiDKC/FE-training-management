import React, { useEffect, useState } from "react";
import { getLopById } from "../../services/lopApi";
import { getDsHocVienByLopId } from "../../services/dsHocVienApi";
import { useParams, useNavigate } from "react-router";

const LopDetail = () => {
  const { id } = useParams();
  const [lop, setLop] = useState(null);
  const [dsHocVien, setDsHocVien] = useState([]);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();


  useEffect(() => {
    getLopById(id).then(setLop);

    if (id) {
      getDsHocVienByLopId(id).then((data) => {
        if (data.message) {
          setMessage(data.message); 
        } else {
          setDsHocVien(data);
        }
      });
    }
  }, [id]);

  if (!lop) return <div className="container mt-4">🔄 Đang tải thông tin lớp học...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📄 Thông tin lớp học</h4>
          <div>
            <button
              className="btn btn-light btn-sm me-2"
              onClick={() => navigate(`/lop/edit/${lop.lopId}`)}
            >
              ✏️ Chỉnh sửa lớp
            </button>
            <button
              className="btn btn-info btn-sm me-2"
              onClick={() => navigate(`/chi-tiet-lop/${lop.lopId}`)} 
            >
              👀 Xem buổi học
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/lop")}
            >
              ⬅️ Quay lại
            </button>
          </div>
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

      <div className="mt-4">
        <h4>📋 Danh sách học viên</h4>
        {message ? (
          <p>{message}</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>🆔 Mã học viên</th>
                <th>👤 Họ tên học viên</th>
                <th>💳 Số CCCD</th>
              </tr>
            </thead>
            <tbody>
              {dsHocVien.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">Không có học viên</td>
                </tr>
              ) : (
                dsHocVien.map((item) => (
                  <tr key={item.danhSachHocVienId}>
                    <td>{item.hocVienId}</td>
                    <td>{item.hocVienName}</td>
                    <td>{item.soCanCuoc}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LopDetail;
