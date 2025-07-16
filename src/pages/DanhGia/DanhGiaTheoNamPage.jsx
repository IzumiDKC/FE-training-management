import React, { useEffect, useState } from "react";
import { getAllDanhGiaTheoNam } from "../../services/danhGiaTheoNamApi";
import "./DanhGiaTheoNamPage.css";

const DanhGiaTheoNamPage = () => {
  const [danhGias, setDanhGias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDanhGiaTheoNam();
        setDanhGias(data);
      } catch (error) {
        console.error("Lỗi tải đánh giá tổng kết năm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getEvaluationTypeClass = (loaiDanhGia) => {
    switch (loaiDanhGia?.toLowerCase()) {
      case 'tốt': return 'tot';
      case 'khá': return 'kha';
      case 'trung bình': return 'trung-binh';
      default: return 'khac';
    }
  };

  return (
    <div className="danhgia-theonam-container">
      <div className="theonam-element-1"></div>
      <div className="theonam-element-2"></div>
      <div className="theonam-element-3"></div>
      
      <div className="danhgia-theonam-content">
        <div className="danhgia-theonam-header">
          <h2 className="danhgia-theonam-title">
            📆 Đánh giá tổng kết năm
          </h2>
        </div>

        <div className="theonam-table-container">
          {loading ? (
            <div className="theonam-loading">
              Đang tải dữ liệu...
            </div>
          ) : (
            <table className="theonam-table">
              <thead className="theonam-table-header">
                <tr>
                  <th>👤 Họ tên</th>
                  <th>🆔 Số CCCD</th>
                  <th>📅 Năm</th>
                  <th>⭐ Loại đánh giá</th>
                  <th>📝 Nội dung</th>
                  <th>📆 Ngày đánh giá</th>
                  <th>👨‍🏫 Người đánh giá</th>
                </tr>
              </thead>
              <tbody className="theonam-table-body">
                {danhGias.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="theonam-no-data">
                      📭 Không có dữ liệu đánh giá tổng kết năm
                    </td>
                  </tr>
                ) : (
                  danhGias.map((item, index) => (
                    <tr key={index} className="theonam-table-row">
                      <td className="theonam-table-cell">{item.hoTen}</td>
                      <td className="theonam-table-cell">{item.soCanCuoc}</td>
                      <td className="theonam-table-cell">{item.nam}</td>
                      <td className="theonam-table-cell">
                        <span className={`theonam-evaluation-type ${getEvaluationTypeClass(item.loaiDanhGia)}`}>
                          {item.loaiDanhGia}
                        </span>
                      </td>
                      <td className="theonam-table-cell">{item.noiDung}</td>
                      <td className="theonam-table-cell">
                        {new Date(item.ngayDanhGia).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="theonam-table-cell">{item.nguoiDanhGia}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DanhGiaTheoNamPage;
