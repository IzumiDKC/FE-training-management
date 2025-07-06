import React, { useEffect, useState } from "react";
import { getAllLop, deleteLop } from "../services/lopApi";
import { useNavigate } from "react-router";
import "../pages/Lop/lop.css";

const SAMPLE_LOPS = [
  {
    lopId: 1,
    tenLop: "Mẫu 1",
    ngayBatDauDuKien: "2025-07-01",
    ngayKetThucDuKien: "2025-09-30",
    khoaHocName: "Toán nâng cao",
    loaiLopName: "Offline",
  },
  {
    lopId: 2,
    tenLop: "Mẫu 2",
    ngayBatDauDuKien: "2025-07-05",
    ngayKetThucDuKien: "2025-09-30",
    khoaHocName: "Văn học",
    loaiLopName: "Online",
  },
  {
    lopId: 3,
    tenLop: "Mẫu 3",
    ngayBatDauDuKien: "2025-08-01",
    ngayKetThucDuKien: "2025-10-15",
    khoaHocName: "Tiếng Anh giao tiếp",
    loaiLopName: "Offline",
  },
];

const LopList = () => {
  //const [lops, setLops] = useState([]); // xóa DL mẫu rồi thì rỡ ra
  const [lops, setLops] = useState(SAMPLE_LOPS); // xóa DL mẫu đi thì xóa dòng này
  const navigate = useNavigate();

  useEffect(() => {
   // getAllLop().then(setLops).catch(console.error); // xóa DL mẫu rồi thì rỡ ra
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa lớp học này?")) {
     // await deleteLop(id); // xóa DL mẫu rồi thì rỡ ra
     // setLops(await getAllLop()); // xóa DL mẫu rồi thì rỡ ra
     setLops(lops.filter(lop => lop.lopId !== id)); // xóa DL mẫu đi thì xóa dòng này
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📚 Danh sách lớp</h3>
        <button className="btn btn-success" onClick={() => navigate("/lop/create")}>
          ➕ Thêm lớp
        </button>
      </div>

      <div className="row">
        {lops.map((lop) => (
          <div className="col-md-4 mb-4" key={lop.lopId}>
            <div className="class-card shadow-sm h-100 d-flex flex-column">
              <div className="d-flex align-items-center mb-2">
                <span className="class-avatar me-2">🏫</span>
                <span className="fw-bold fs-5">{lop.tenLop}</span>
              </div>
              <div className="mb-1">
                <b>Thời gian:</b> {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} - {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}
              </div>
              <div className="mb-1"><b>Khóa học:</b> {lop.khoaHocName}</div>
              <div className="mb-2"><b>Loại lớp:</b> {lop.loaiLopName}</div>
              <div className="mt-auto">
                <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/lop/${lop.lopId}`)}>Xem</button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/lop/edit/${lop.lopId}`)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(lop.lopId)}>Xóa</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LopList;
