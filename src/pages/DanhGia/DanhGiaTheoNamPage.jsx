import React, { useEffect, useState } from "react";
import { getAllDanhGiaTheoNam } from "../../services/danhGiaTheoNamApi";

const DanhGiaTheoNamPage = () => {
  const [danhGias, setDanhGias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDanhGiaTheoNam();
        setDanhGias(data);
      } catch (error) {
        console.error("Lỗi tải đánh giá tổng kết năm:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📆 Đánh giá tổng kết năm</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Số CCCD</th>
            <th>Năm</th>
            <th>Loại</th>
            <th>Nội dung</th>
            <th>Ngày đánh giá</th>
            <th>Người đánh giá</th>
          </tr>
        </thead>
        <tbody>
          {danhGias.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            danhGias.map((item, index) => (
              <tr key={index}>
                <td>{item.hoTen}</td>
                <td>{item.soCanCuoc}</td>
                <td>{item.nam}</td>
                <td>{item.loaiDanhGia}</td>
                <td>{item.noiDung}</td>
                <td>{new Date(item.ngayDanhGia).toLocaleDateString()}</td>
                <td>{item.nguoiDanhGia}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DanhGiaTheoNamPage;
