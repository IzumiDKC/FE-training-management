import React, { useEffect, useState } from "react";
import { getLoaiLopById, deleteLoaiLop } from "../../services/loaiLopApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft,FaEdit,FaTrash,FaGraduationCap,FaInfoCircle,FaCalendarAlt,FaIdBadge,FaBook} from "react-icons/fa";
import "../css/LoaiLop/LoaiLopDetail.css";
import useRole from "../../hooks/useRole";
import { useCallback } from "react";
const LoaiLopDetail = () => {
  const [loaiLop, setLoaiLop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin, isGiangVien } = useRole();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLoaiLopById(id);
      setLoaiLop(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xóa loại lớp này?")) {
      try {
        await deleteLoaiLop(id);
        navigate("/loai-lop");
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="detail-education-container">
        {/* Background Effects */}
        <div className="detail-background">
          <div className="detail-particles">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="detail-dot"></div>
            ))}
          </div>
          <div className="detail-shapes">
            <div className="detail-shape shape-circle"></div>
            <div className="detail-shape shape-square"></div>
            <div className="detail-shape shape-triangle"></div>
          </div>
        </div>

        <div className="detail-loading">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h3>Đang tải thông tin...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (!loaiLop) {
    return (
      <div className="detail-education-container">
        <div className="detail-header">
          <div className="header-left">
            <button 
              className="back-button"
              onClick={() => navigate("/loai-lop")}
              type="button"
            >
              <FaArrowLeft />
            </button>
            <div className="detail-icon">
              <FaGraduationCap />
            </div>
            <div className="detail-title">
              <h1>Không tìm thấy loại lớp</h1>
              <p>Loại lớp bạn tìm kiếm không tồn tại</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-education-container">
      {/* Background Effects */}
      <div className="detail-background">
        <div className="detail-particles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="detail-dot"></div>
          ))}
        </div>
        <div className="detail-shapes">
          <div className="detail-shape shape-circle"></div>
          <div className="detail-shape shape-square"></div>
          <div className="detail-shape shape-triangle"></div>
        </div>
      </div>

      {/* Header */}
      <div className="detail-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate("/loai-lop")}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="detail-icon">
            <FaGraduationCap />
          </div>
          <div className="detail-title">
            <h1>Chi tiết loại lớp</h1>
          </div>
        </div>
        <div className="header-actions">
          {(isAdmin || isGiangVien) && (
            <button 
            className="btn-edit"
            onClick={() => navigate(`/loai-lop/e/${id}`)}
          >
            <FaEdit />
            <span>Chỉnh sửa</span>
          </button>
          )}
          {isAdmin && (
          <button 
            className="btn-delete"
            onClick={handleDelete}
          >
            <FaTrash />
            <span>Xóa</span>
          </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        <div className="detail-card">
          <div className="card-header">
            <div className="info-icon">
              <FaInfoCircle />
            </div>
            <div className="card-title">
                <h3>Thông tin loại lớp</h3>             
            </div>
            <div className="card-title">
              <h2>{loaiLop.tenLoaiLop}</h2>
            </div>
          </div>

          <div className="info-section">
            <div className="info-row">
              <div className="info-label">
                <FaIdBadge />
                Mã loại lớp
              </div>
              <div className="info-value">
                <div className="info-badge">
                  <FaBook />
                  {loaiLop.loaiLopId}
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <FaBook />
                Tên loại lớp
              </div>
              <div className="info-value">
                {loaiLop.tenLoaiLop}
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <FaCalendarAlt />
                Ngày tạo
              </div>
              <div className="info-value">
                {new Date().toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaiLopDetail;