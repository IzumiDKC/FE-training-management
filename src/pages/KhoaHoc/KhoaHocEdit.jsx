import React, { useEffect, useState, useRef } from "react";
import { getKhoaHocById, updateKhoaHoc } from "../../services/khoaHocApi";
import { getAllChuongTrinh } from "../../services/chuongTrinhApi";
import { useParams, useNavigate } from "react-router";
import { gsap } from "gsap";
import { FaSave, FaSpinner,FaEdit } from "react-icons/fa";
import "../css/KhoaHoc/KhoaHocEdit.css";

const KhoaHocEdit = () => {
  const { id } = useParams();
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [chuongTrinhDaoTaoId, setChuongTrinhDaoTaoId] = useState("");
  const [chuongTrinhOptions, setChuongTrinhOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const khoaHoc = await getKhoaHocById(id);
        const chuongTrinhs = await getAllChuongTrinh();

        setTenKhoaHoc(khoaHoc.tenKhoaHoc);
        setChuongTrinhDaoTaoId(khoaHoc.chuongTrinhDaoTao?.chuongTrinhDaoTaoId || "");
        setChuongTrinhOptions(chuongTrinhs);
        gsap.fromTo(cardRef.current, 
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
        
        gsap.fromTo(".form-group", 
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
        );
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        alert("Không thể tải thông tin khóa học");
        navigate("/khoa-hoc");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      await updateKhoaHoc(id, {
        khoaHocId: parseInt(id),
        tenKhoaHoc,
        chuongTrinhDaoTaoId: parseInt(chuongTrinhDaoTaoId),
      });
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to(cardRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.3,
            onComplete: () => navigate("/khoa-hoc")
          });
        }
      });
    } catch (error) {
      console.error(error);
      gsap.to(cardRef.current, {
        x: -5,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        onComplete: () => {
          alert("Lỗi khi cập nhật khóa học!");
          setIsSubmitting(false);
        }
      });
    }
  };

  const handleInputFocus = (e) => {
    gsap.to(e.target, {
      scale: 1.02,
      borderColor: "#f59e0b",
      duration: 0.2
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target, {
      scale: 1,
      borderColor: "#e2e8f0",
      duration: 0.2
    });
  };

  return (
    <div className="edit-page">
      <div className="edit-container">
        <div className="edit-card" ref={cardRef}>
          <div className="card-header">
            <div className="header-left">
              <h2><FaEdit className="me-2" /> Cập nhật khóa học</h2>  
            </div>
          </div>

          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <label>Tên khóa học</label>
              <input
                className="form-input"
                value={tenKhoaHoc}
                onChange={(e) => setTenKhoaHoc(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>

            <div className="form-group">
              <label>Chương trình đào tạo</label>
              <select
                className="form-select"
                value={chuongTrinhDaoTaoId}
                onChange={(e) => setChuongTrinhDaoTaoId(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              >
                <option value="">-- Chọn chương trình --</option>
                {chuongTrinhOptions.map((ct) => (
                  <option key={ct.chuongTrinhDaoTaoId} value={ct.chuongTrinhDaoTaoId}>
                    {ct.tenChuongTrinh}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate("/khoa-hoc")}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="spinning" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Cập nhật
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KhoaHocEdit;