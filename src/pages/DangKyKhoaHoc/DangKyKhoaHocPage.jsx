// src/pages/DangKyKhoaHoc/DangKyKhoaHocPage.jsx
import React, { useEffect, useState } from "react";
import { getAllDangKy } from "../../services/dangKyApi";

const DangKyKhoaHocPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDangKy()
      .then(setData)
      .catch((err) => console.error("Lỗi khi tải danh sách:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>📋 Danh sách đăng ký khóa học</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Học viên</th>
            <th>Khóa học</th>
            <th>Ngày đăng ký</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.dangKyKhoaHocId}>
              <td>{item.tenHocVien}</td>
              <td>{item.tenKhoaHoc}</td>
              <td>{new Date(item.ngayDangKy).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DangKyKhoaHocPage;
