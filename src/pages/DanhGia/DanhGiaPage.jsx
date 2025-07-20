import React, { useEffect, useState } from "react";
import { getAllDanhGia } from "../../services/danhGiaApi";
import "./DanhGiaPage.css";

const DanhGiaPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllDanhGia();
        setData(res);
      } catch (err) {
        console.error("Lỗi tải đánh giá:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getEvaluationTypeClass = (loaiDanhGia) => {
    if (!loaiDanhGia) return 'neutral';
    const type = loaiDanhGia.toLowerCase();
    if (type.includes('tốt') || type.includes('xuất sắc') || type.includes('giỏi')) {
      return 'positive';
    } else if (type.includes('kém') || type.includes('yếu') || type.includes('chưa đạt')) {
      return 'negative';
    }
    return 'neutral';
  };

  if (loading) {
    return (
      <div className="danhgia-container">
        <div className="evaluation-element-1"></div>
        <div className="evaluation-element-2"></div>
        <div className="evaluation-element-3"></div>
        <div className="loading-spinner">
          � Đang tải danh sách đánh giá...
        </div>
      </div>
    );
  }

  return (
    <div className="danhgia-container">
      <div className="evaluation-element-1"></div>
      <div className="evaluation-element-2"></div>
      <div className="evaluation-element-3"></div>
      
      <div className="danhgia-content">
        <div className="danhgia-header">
          <h2 className="danhgia-title">
            Danh Sách Đánh Giá
          </h2>
        </div>
        
        <div className="danhgia-card">
          <table className="danhgia-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Lớp</th>
                <th>Loại</th>
                <th>Nội dung</th>
                <th>Người đánh giá</th>
                <th>Ngày đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.danhGiaId}>
                  <td>{item.hoTen}</td>
                  <td>{item.tenLop}</td>
                  <td>
                    <span className={`evaluation-type-badge ${getEvaluationTypeClass(item.loaiDanhGia)}`}>
                      {item.loaiDanhGia}
                    </span>
                  </td>
                  <td>{item.noiDung}</td>
                  <td>{item.nguoiDanhGia}</td>
                  <td>{new Date(item.ngayDanhGia).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DanhGiaPage;
