import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDsHocVienByLopId } from "../../services/dsHocVienApi";
import { getLopById } from "../../services/lopApi";
import { createDanhGia } from "../../services/danhGiaApi";
import useRole from "../../hooks/useRole";
import "../css/DanhGia/DanhGiaCreatePage.css";

const DanhGiaCreatePage = () => {
  const { lopId, hocVienId } = useParams();
  const navigate = useNavigate();
  const [hocVienInfo, setHocVienInfo] = useState(null);
  const [lopInfo, setLopInfo] = useState(null);

  const [loaiDanhGia, setLoaiDanhGia] = useState(""); // giá trị thực sẽ gửi
  const [loaiDanhGiaKhac, setLoaiDanhGiaKhac] = useState(""); // chỉ khi chọn "Khác"
  const [noiDung, setNoiDung] = useState("");
  const [message, setMessage] = useState("");
  const { isAdmin, isGiangVien } = useRole();

  useEffect(() => {
    if (lopId && hocVienId && (isAdmin || isGiangVien)) {
      getLopById(lopId).then(setLopInfo);
      getDsHocVienByLopId(lopId).then((data) => {
        const found = data.find((hv) => hv.hocVienId === parseInt(hocVienId));
        if (found) {
          setHocVienInfo(found);
        } else {
          setMessage("Không tìm thấy học viên phù hợp.");
        }
      }).catch((err) => {
        console.error("Lỗi khi lấy danh sách học viên:", err);
        setMessage("Không thể hiển thị học viên.");
      });
    }
  }, [lopId, hocVienId, isAdmin, isGiangVien]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalLoaiDanhGia = loaiDanhGia === "Khác" ? loaiDanhGiaKhac : loaiDanhGia;

    if (!finalLoaiDanhGia.trim()) {
      alert("Vui lòng nhập loại đánh giá.");
      return;
    }

    try {
      await createDanhGia({
        hocVienId: parseInt(hocVienId),
        lopId: parseInt(lopId),
        loaiDanhGia: finalLoaiDanhGia,
        noiDung,
      });
      alert("✅ Đánh giá đã được tạo");
      navigate("/danh-gia");
    } catch (error) {
      console.error("Lỗi khi tạo đánh giá:", error);
      alert("❌ Lỗi khi tạo đánh giá");
    }
  };

  return (
    <div className="danhgia-create-container">
      <div className="create-element-1"></div>
      <div className="create-element-2"></div>
      <div className="create-element-3"></div>
      
      <div className="danhgia-create-content">
        <div className="danhgia-create-header">
          <h2 className="danhgia-create-title">
            📝 Tạo Đánh Giá Học Viên
          </h2>
        </div>

        {lopInfo && hocVienInfo && (
          <div className="info-card">
            <div className="info-card-header">
              <strong>📌 Thông tin lớp & học viên</strong>
            </div>
            <div className="info-card-body">
              <p><strong>🏫 Chương trình:</strong> {lopInfo.chuongTrinhName}</p>
              <p><strong>📘 Khóa học:</strong> {lopInfo.khoaHocName}</p>
              <p><strong>🏷️ Lớp:</strong> {lopInfo.tenLop}</p>
              <p><strong>👤 Học viên:</strong> {hocVienInfo.hocVienName} ({hocVienInfo.soCanCuoc})</p>
            </div>
          </div>
        )}

        {message && (
          <div className="create-alert">⚠️ {message}</div>
        )}

        <form onSubmit={handleSubmit} className="create-form-card">
          <div className="create-form-body">
            {/* Radio chọn loại đánh giá */}
            <div className="mb-3">
              <label className="create-form-label">🔖 Loại đánh giá</label>
              <div className="create-form-check">
                <input
                  type="radio"
                  className="create-form-check-input"
                  id="danhGiaTot"
                  name="loaiDanhGia"
                  value="Tốt"
                  checked={loaiDanhGia === "Tốt"}
                  onChange={(e) => setLoaiDanhGia(e.target.value)}
                />
                <label className="create-form-check-label" htmlFor="danhGiaTot">⭐ Tốt</label>
              </div>
              <div className="create-form-check">
                <input
                  type="radio"
                  className="create-form-check-input"
                  id="danhGiaKha"
                  name="loaiDanhGia"
                  value="Khá"
                  checked={loaiDanhGia === "Khá"}
                  onChange={(e) => setLoaiDanhGia(e.target.value)}
                />
                <label className="create-form-check-label" htmlFor="danhGiaKha">👍 Khá</label>
              </div>
              <div className="create-form-check">
                <input
                  type="radio"
                  className="create-form-check-input"
                  id="danhGiaTB"
                  name="loaiDanhGia"
                  value="Trung Bình"
                  checked={loaiDanhGia === "Trung Bình"}
                  onChange={(e) => setLoaiDanhGia(e.target.value)}
                />
                <label className="create-form-check-label" htmlFor="danhGiaTB">👌 Trung Bình</label>
              </div>
              <div className="create-form-check">
                <input
                  type="radio"
                  className="create-form-check-input"
                  id="danhGiaKhac"
                  name="loaiDanhGia"
                  value="Khác"
                  checked={loaiDanhGia === "Khác"}
                  onChange={(e) => setLoaiDanhGia(e.target.value)}
                />
                <label className="create-form-check-label" htmlFor="danhGiaKhac">✏️ Khác</label>
              </div>

              {/* Nếu chọn "Khác" thì hiện ô nhập */}
              {loaiDanhGia === "Khác" && (
                <input
                  type="text"
                  className="create-form-control mt-2"
                  placeholder="Nhập loại đánh giá khác"
                  value={loaiDanhGiaKhac}
                  onChange={(e) => setLoaiDanhGiaKhac(e.target.value)}
                  required
                />
              )}
            </div>

            <div className="mb-3">
              <label className="create-form-label">📝 Nội dung đánh giá</label>
              <textarea
                className="create-form-control"
                rows={4}
                value={noiDung}
                onChange={(e) => setNoiDung(e.target.value)}
                placeholder="Nhận xét chi tiết về học viên..."
                required
              ></textarea>
            </div>

            <div className="create-btn-group">
              <button
                type="button"
                className="create-btn create-btn-secondary"
                onClick={() => navigate(-1)}
              >
                ⬅️ Quay lại
              </button>
              <button type="submit" className="create-btn create-btn-primary">
                ➕ Gửi đánh giá
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DanhGiaCreatePage;
