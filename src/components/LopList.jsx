import React, { useEffect, useState } from "react";
import { getAllLop, deleteLop } from "../services/lopApi";
import { useNavigate } from "react-router";
import useRole from "../hooks/useRole";

const LopList = () => {
  const [lops, setLops] = useState([]);
  const navigate = useNavigate();
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    getAllLop().then(setLops).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa lớp học này?")) {
      try {
        await deleteLop(id);
        setLops(await getAllLop());
      } catch (error) {
        alert("❌ Xóa thất bại.");
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📚 Danh sách lớp</h3>
        {(isAdmin || isGiangVien) && (
          <button className="btn btn-success" onClick={() => navigate("/lop/create")}>
            ➕ Thêm lớp
          </button>
        )}
      </div>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
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
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => navigate(`/lop/${lop.lopId}`)}
                >
                Xem
                </button>

                {(isAdmin || isGiangVien) && (
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/lop/edit/${lop.lopId}`)}
                  >
                    Sửa
                  </button>
                )}

                {isAdmin && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(lop.lopId)}
                  >
                    🗑️ Xóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LopList;
