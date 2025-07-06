import React, { useEffect, useState } from "react";
import { getAllLop, deleteLop } from "../services/lopApi";
import { useNavigate } from "react-router";

const LopList = () => {
  const [lops, setLops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLop().then(setLops).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa lớp học này?")) {
      await deleteLop(id);
      setLops(await getAllLop());
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

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên lớp</th>
            <th>Thời gian</th>
            <th>Khóa học</th>
            <th>Loại lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {lops.map((lop) => (
            <tr key={lop.lopId}>
              <td>{lop.tenLop}</td>
              <td>
                {new Date(lop.ngayBatDauDuKien).toLocaleDateString()} -{" "}
                {new Date(lop.ngayKetThucDuKien).toLocaleDateString()}
              </td>
              <td>{lop.khoaHocName}</td>
              <td>{lop.loaiLopName}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/lop/${lop.lopId}`)}>Xem</button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/lop/edit/${lop.lopId}`)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(lop.lopId)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LopList;
