import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDsHocVienByLopId } from "../../services/dsHocVienApi";
import { getLopById } from "../../services/lopApi";
import { createDanhGia } from "../../services/danhGiaApi";
import useRole from "../../hooks/useRole";

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
    <div className="container mt-4">
      <h2>📝 Tạo đánh giá học viên</h2>

      {lopInfo && hocVienInfo && (
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-header bg-info text-white">
            <strong>📌 Thông tin lớp & học viên</strong>
          </div>
          <div className="card-body">
            <p><strong>🏫 Chương trình:</strong> {lopInfo.chuongTrinhName}</p>
            <p><strong>📘 Khóa học:</strong> {lopInfo.khoaHocName}</p>
            <p><strong>🏷️ Lớp:</strong> {lopInfo.tenLop}</p>
            <p><strong>👤 Học viên:</strong> {hocVienInfo.hocVienName} ({hocVienInfo.soCanCuoc})</p>
          </div>
        </div>
      )}

      {message && (
        <div className="alert alert-warning">⚠️ {message}</div>
      )}

      <form onSubmit={handleSubmit} className="card shadow-sm border-0">
        <div className="card-body">
          {/* Radio chọn loại đánh giá */}
          <div className="mb-3">
            <label className="form-label">🔖 Loại đánh giá</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="danhGiaTot"
                name="loaiDanhGia"
                value="Tốt"
                checked={loaiDanhGia === "Tốt"}
                onChange={(e) => setLoaiDanhGia(e.target.value)}
              />
              <label className="form-check-label" htmlFor="danhGiaTot">Tốt</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="danhGiaKha"
                name="loaiDanhGia"
                value="Khá"
                checked={loaiDanhGia === "Khá"}
                onChange={(e) => setLoaiDanhGia(e.target.value)}
              />
              <label className="form-check-label" htmlFor="danhGiaKha">Khá</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="danhGiaTB"
                name="loaiDanhGia"
                value="Trung Bình"
                checked={loaiDanhGia === "Trung Bình"}
                onChange={(e) => setLoaiDanhGia(e.target.value)}
              />
              <label className="form-check-label" htmlFor="danhGiaTB">Trung Bình</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="danhGiaKhac"
                name="loaiDanhGia"
                value="Khác"
                checked={loaiDanhGia === "Khác"}
                onChange={(e) => setLoaiDanhGia(e.target.value)}
              />
              <label className="form-check-label" htmlFor="danhGiaKhac">Khác</label>
            </div>

            {/* Nếu chọn "Khác" thì hiện ô nhập */}
            {loaiDanhGia === "Khác" && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nhập loại đánh giá khác"
                value={loaiDanhGiaKhac}
                onChange={(e) => setLoaiDanhGiaKhac(e.target.value)}
                required
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">📝 Nội dung đánh giá</label>
            <textarea
              className="form-control"
              rows={4}
              value={noiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              placeholder="Nhận xét chi tiết..."
              required
            ></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              ⬅️ Quay lại
            </button>
            <button type="submit" className="btn btn-primary">
              ➕ Gửi đánh giá
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DanhGiaCreatePage;
