import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { getChuongTrinhById } from "../../services/chuongTrinhApi";
import { FaArrowLeft, FaEdit,FaTrash,FaGraduationCap,FaInfoCircle,FaIdBadge,FaBook,FaFileAlt,FaClock} from "react-icons/fa";
import { gsap } from "gsap";
import "./ChuongTrinhDetail.css";
import useRole from "../../hooks/useRole";

const ChuongTrinhDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin, isGiangVien } = useRole();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getChuongTrinhById(id);
        setItem(data);
        setTimeout(() => {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 80, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
          );
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
          );
          gsap.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.5, ease: "power2.out" }
          );
        }, 100);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xóa chương trình này?")) {
      try {
        navigate("/chuongtrinh");
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="program-detail-container">
        {/* Background Effects */}
        <div className="detail-background">
          <div className="detail-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="detail-dot"></div>
            ))}
          </div>
          <div className="detail-shapes">
            <div className="detail-shape shape-circle"></div>
            <div className="detail-shape shape-square"></div>
            <div className="detail-shape shape-triangle"></div>
            <div className="detail-shape shape-hexagon"></div>
          </div>
        </div>

        <div className="program-loading">
          <div className="loading-content">
            <div className="loading-icon">
              <FaGraduationCap className="spinner-icon" />
            </div>
            <h3>Đang tải thông tin chương trình...</h3>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="program-detail-container">
        <div className="detail-header">
          <div className="header-left">
            <button 
              className="back-button"
              onClick={() => navigate("/chuongtrinh")}
              type="button"
            >
              <FaArrowLeft />
            </button>
            <div className="detail-icon">
              <FaGraduationCap />
            </div>
            <div className="detail-title">
              <h1>Không tìm thấy chương trình</h1>
              <p>Chương trình bạn tìm kiếm không tồn tại</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="program-detail-container">
      {/* Background Effects */}
      <div className="detail-background">
        <div className="detail-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="detail-dot"></div>
          ))}
        </div>
        <div className="detail-shapes">
          <div className="detail-shape shape-circle"></div>
          <div className="detail-shape shape-square"></div>
          <div className="detail-shape shape-triangle"></div>
          <div className="detail-shape shape-hexagon"></div>
        </div>
      </div>

      {/* Header */}
      <div className="detail-inner-container">
      <div className="detail-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate("/chuong-trinh")}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <div className="detail-icon">
            <FaGraduationCap />
          </div>
          <div ref={titleRef} className="detail-title">
            <h1>Chi tiết chương trình</h1>
          </div>
        </div>
        <div className="header-actions">
          {(isAdmin || isGiangVien) && (
          <button 
            className="btn-edit"
            onClick={() => navigate(`/chuong-trinh/edit/${id}`)}
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
        <div ref={cardRef} className="detail-card">
          <div className="card-header">
            <div className="info-icon">
              <FaInfoCircle />
            </div>
            <div className="card-title">
              <h3>Thông tin chương trình</h3>
            </div>
          </div>

          <div ref={contentRef} className="info-section">
            <div className="info-row">
              <div className="info-label">
                <FaIdBadge />
                Mã chương trình
              </div>
              <div className="info-value">
                <div className="info-badge">
                  <FaBook />
                  {item.id || item.chuongTrinhDaoTaoId}
                  
                </div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <FaGraduationCap />
                Tên chương trình
              </div>
              <div className="info-value program-name">
                {item.tenChuongTrinh}
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <FaFileAlt />
                Mô tả
              </div>
              <div className="info-value">
                {item.moTa || (
                  <em style={{ color: "#94a3b8", fontStyle: "italic" }}>
                    Chưa có mô tả cho chương trình này
                  </em>
                )}
              </div>
            </div>

            {item.updatedAt && (
              <div className="info-row">
                <div className="info-label">
                  <FaClock />
                  Cập nhật cuối
                </div>
                <div className="info-value">
                  {new Date(item.updatedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-left">
                <div className="stat-icon">
                  <FaBook />
                </div>
              </div>
              <div className="stat-right">
                <span className="stat-number">{item.khoaHocs?.length || 0}</span>
                <span className="stat-label">Khóa học</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChuongTrinhDetail;