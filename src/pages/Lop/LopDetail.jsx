import React, { useEffect, useState } from "react";
import { getLopById } from "../../services/lopApi";
import { getDsHocVienByLopId } from "../../services/dsHocVienApi";
import { useParams, useNavigate } from "react-router";
import useRole from "../../hooks/useRole";

const LopDetail = () => {
  const { id } = useParams();
  const [lop, setLop] = useState(null);
  const [dsHocVien, setDsHocVien] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    if (!id) return;

    getLopById(id)
      .then((data) => {
        setLop(data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy lớp:", err);
        setMessage("Không tìm thấy lớp học.");
      });
  }, [id]);

  useEffect(() => {
    if (!lop || !id || !(isAdmin || isGiangVien)) return;

    if (!lop.coDanhSachHocVien) {
      setMessage("Lớp học này chưa có danh sách học viên.");
      return;
    }

    getDsHocVienByLopId(id)
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setDsHocVien(data);
        }
      })
      .catch((err) => {
        console.error("Không thể lấy danh sách học viên:", err);
        setMessage("Không thể hiển thị danh sách học viên.");
      });
  }, [lop, id, isAdmin, isGiangVien]);

  if (!lop) {
    return <div className="container mt-4">Đang tải thông tin lớp học...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📄 Thông tin lớp học</h4>
          <div>
            {(isAdmin || isGiangVien) && (
              <button
                className="btn btn-light btn-sm me-2"
                onClick={() => navigate(`/lop/edit/${lop.lopId}`)}
              >
                Chỉnh sửa lớp
              </button>
            )}
            <button
              className="btn btn-info btn-sm me-2"
              onClick={() => navigate(`/chi-tiet-lop/${lop.lopId}`)}
            >
              Xem buổi học
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
            <dd className="col-sm-9">
              {lop.soGio} giờ ({lop.soGioQuyDoi} giờ quy đổi)
            </dd>

            <dt className="col-sm-3">📅 Thời gian học:</dt>
            <dd className="col-sm-9">
              {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} -{" "}
              {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}
            </dd>
          </dl>
        </div>
      </div>

      {(isAdmin || isGiangVien) && (
        <div className="mt-4">
          <h4>📋 Danh sách học viên</h4>

          {message && (
            <div className="alert alert-info">{message}</div>
          )}

          {!message && (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>🆔 Mã học viên</th>
                  <th>👤 Họ tên học viên</th>
                  <th>💳 Số CCCD</th>
                  <th>⚙️ Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {dsHocVien.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Không có học viên
                    </td>
                  </tr>
                ) : (
                  dsHocVien.map((item) => (
                    <tr key={item.danhSachHocVienId}>
                      <td>{item.hocVienId}</td>
                      <td>{item.hocVienName}</td>
                      <td>{item.soCanCuoc}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            navigate(`/danh-gia/create/${item.hocVienId}/${id}`)
                          }
                        >
                          📝 Đánh giá
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>         
          )}
          {(isAdmin || isGiangVien) && lop && (
  <div className="mt-3">
    <button
      className="btn btn-outline-primary"
      onClick={() => navigate(`/lop/chon-hoc-vien/${lop.lopId}`)}
    >
      ➕ Thêm học viên vào lớp
    </button>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default LopDetail;
