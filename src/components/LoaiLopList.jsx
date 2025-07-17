import React, { useEffect, useState } from "react";
import { getAllLoaiLop, deleteLoaiLop } from "../services/loaiLopApi";
import { useNavigate } from "react-router";
import useRole from "../hooks/useRole";
import "./LoaiLopList.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const LoaiLopList = () => {
  const [loaiLops, setLoaiLops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { isAdmin, isGiangVien } = useRole();

  const fetchData = async () => {
    try {
      const data = await getAllLoaiLop();
      setLoaiLops(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="loailop-container">
        <div className="loailop-content">
          <div className="loailop-loading">
            <div className="loailop-loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loailop-container">
      <div className="loailop-content">
        <div className="loailop-header">
          <h1 className="loailop-title">Quản Lý Loại Lớp</h1>
          {(isAdmin || isGiangVien) && (
            <button
              className="loailop-add-btn"
              onClick={() => navigate("/loai-lop/create")}
            >
              ➕ Thêm Loại Lớp Mới
            </button>
          )}
        </div>

        {loaiLops.length === 0 ? (
          <div className="loailop-list">
            <div className="loailop-empty">
              <div className="loailop-empty-icon">📚</div>
              <div className="loailop-empty-text">Chưa có loại lớp nào</div>
              <div className="loailop-empty-subtext">
                Hãy thêm loại lớp đầu tiên để bắt đầu quản lý
              </div>
            </div>
          </div>
        ) : (
          <div className="loailop-list">
            <div className="loailop-list-header">
              📋 Danh Sách Loại Lớp ({loaiLops.length} loại)
            </div>
            <div className="loailop-list-items">
              {loaiLops.map((l, index) => (
                <div key={l.loaiLopId} className="loailop-item">
                  <div className="loailop-item-content">
                    <div className="loailop-item-icon">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </div>
                    <div className="loailop-item-info">
                      <h3 className="loailop-item-name">{l.tenLoaiLop}</h3>
                      <div className="loailop-item-meta">
                        Loại lớp trong hệ thống đào tạo
                      </div>
                    </div>
                  </div>
                  <div className="loailop-actions">
                    <button
                        className="loailop-btn loailop-btn-view"
                        onClick={() => navigate(`/loai-lop/${l.loaiLopId}`)}
                      >
                        <FaEye className="me-1 icon-white" /> Xem
                      </button>

                      {(isAdmin || isGiangVien) && (
                        <button
                          className="loailop-btn loailop-btn-edit"
                          onClick={() => navigate(`/loai-lop/e/${l.loaiLopId}`)}
                        >
                          <FaEdit className="me-1 icon-white" /> Sửa
                        </button>
                      )}

                      {isAdmin && (
                        <button
                          className="loailop-btn loailop-btn-delete"
                          onClick={() => handleDelete(l.loaiLopId)}
                        >
                          <FaTrash className="me-1 icon-white" /> Xóa
                        </button>
                      )}
                      </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaiLopList;