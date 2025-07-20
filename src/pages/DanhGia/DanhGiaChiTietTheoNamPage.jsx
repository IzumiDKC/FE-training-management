import React, { useEffect, useState } from "react";
import { getDanhGiaTheoNam } from "../../services/danhGiaApi";
import { createDanhGiaTheoNam } from "../../services/danhGiaTheoNamApi";
import "./DanhGiaChiTietTheoNamPage.css";
const DanhGiaChiTietTheoNamPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getDanhGiaTheoNam(year);
        setData(result);
      } catch (err) {
        console.error("Lỗi tải đánh giá theo năm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  const handleSubmit = async (hocVienId) => {
    const form = formData[hocVienId];
    if (!form || !form.loaiDanhGia || !form.noiDung) {
      alert("Vui lòng nhập đầy đủ thông tin đánh giá tổng kết.");
      return;
    }

    try {
      await createDanhGiaTheoNam({
        hocVienId,
        nam: year,
        loaiDanhGia: form.loaiDanhGia,
        noiDung: form.noiDung,
      });
      alert("✅ Đã gửi đánh giá tổng kết.");
    } catch (error) {
      console.error(error);
      alert("❌ Lỗi khi gửi đánh giá.");
    }
  };

  return (
    <div className="tongket-nam-wrapper">
      <h2>📊 Tổng hợp đánh giá năm {year}</h2>
      <div>
        <label>Chọn năm: </label>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          {[2025, 2024, 2023].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : data.length === 0 ? (
        <p>Không có dữ liệu đánh giá trong năm {year}</p>
      ) : (
        data.map(hv => (
          <div key={hv.hocVienId} className="hocvien-block">
            <h4>{hv.hoTen} ({hv.soCanCuoc}) - {hv.tenLop}</h4>
            <table className="danhgia-table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Loại</th>
                  <th>Nội dung</th>
                </tr>
              </thead>
              <tbody>
                {hv.danhGias.map((dg, i) => (
                  <tr key={i}>
                    <td>{new Date(dg.ngayDanhGia).toLocaleDateString("vi-VN")}</td>
                    <td>{dg.loaiDanhGia}</td>
                    <td>{dg.noiDung}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="tongket-form">
              <input
                type="text"
                placeholder="Loại tổng kết"
                value={formData[hv.hocVienId]?.loaiDanhGia || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [hv.hocVienId]: {
                      ...formData[hv.hocVienId],
                      loaiDanhGia: e.target.value,
                    },
                  })
                }
              />
              <textarea
                rows={3}
                placeholder="Nội dung tổng kết"
                value={formData[hv.hocVienId]?.noiDung || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [hv.hocVienId]: {
                      ...formData[hv.hocVienId],
                      noiDung: e.target.value,
                    },
                  })
                }
              />
              <button onClick={() => handleSubmit(hv.hocVienId)}>📩 Gửi đánh giá tổng kết</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DanhGiaChiTietTheoNamPage;
