import React, { useEffect, useState } from "react";
import { getAllDanhGia } from "../../services/danhGiaApi";

const DanhGiaPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllDanhGia();
        setData(res);
      } catch (err) {
        console.error("Lỗi tải đánh giá:", err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 Danh sách đánh giá</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Loại</th>
            <th>Nội dung</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.danhGiaId}>
              <td>{item.hoTen}</td>
              <td>{item.tenLop}</td>
              <td>{item.loaiDanhGia}</td>
              <td>{item.noiDung}</td>
              <td>{new Date(item.ngayDanhGia).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DanhGiaPage;
