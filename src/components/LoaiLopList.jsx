import React, { useEffect, useState } from "react";
import { getAllLoaiLop, deleteLoaiLop } from "../services/loaiLopApi";
import { useNavigate } from "react-router";
import "../pages/Lop/lop.css";
const ICONS = ["🏷️", "🎯", "💡", "🧑‍💻", "📚", "📝", "🎓", "🧩"];

const LoaiLopList = () => {
  const [loaiLops, setLoaiLops] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getAllLoaiLop();
      setLoaiLops(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa loại lớp này?")) {
      try {
        await deleteLoaiLop(id);
        fetchData();
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>🧩 Danh sách Loại lớp</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/loai-lop/create")}
        >
          ➕ Thêm mới
        </button>
      </div>
      <div className="row">
        {loaiLops.map((l, idx) => (
          <div className="col-md-3 mb-4" key={l.loaiLopId}>
            <div className="loai-lop-card shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <div className="loai-lop-icon mb-2">
                {ICONS[idx % ICONS.length]}
              </div>
              <div className="fw-bold fs-5 mb-2">{l.tenLoaiLop}</div>
              <div>
                <button
                  className="btn btn-sm btn-info me-2 position-relative"
                  onMouseEnter={() => setHoveredId(l.loaiLopId)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/loai-lop/${l.loaiLopId}`)}
                >
                  Xem
                  {hoveredId === l.loaiLopId && (
                    <div className="popover-detail">
                      <div>
                        <b>Mã:</b> {l.loaiLopId}
                      </div>
                      <div>
                        <b>Tên loại lớp:</b> {l.tenLoaiLop}
                      </div>
                      {/* Thêm các thông tin khác nếu có */}
                    </div>
                  )}
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/loai-lop/edit/${l.loaiLopId}`)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(l.loaiLopId)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaiLopList;