import React, { useEffect, useState } from "react";
import { getDiemDanhByChiTietLopId } from "../services/diemDanhApi"; // Lấy API

const DiemDanhList = ({ chiTietLopId }) => {
  const [diemDanhs, setDiemDanhs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDiemDanhByChiTietLopId(chiTietLopId); // Lấy điểm danh theo chiTietLopId
        setDiemDanhs(result);
        setLoading(false);
      } catch (error) {
        setErrorMessage("Không có điểm danh cho buổi học này.");
        setLoading(false);
      }
    };

    if (chiTietLopId) {
      fetchData();
    }
  }, [chiTietLopId]); // Lắng nghe chiTietLopId

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Học viên</th>
            <th>Số CCCD</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {diemDanhs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Không có điểm danh cho buổi học này.
              </td>
            </tr>
          ) : (
            diemDanhs.map((diemDanh) => (
              <tr key={diemDanh.diemDanhId}>
                <td>{diemDanh.hocVienName}</td>
                <td>{diemDanh.soCanCuoc}</td>
                <td>{diemDanh.checkIn || "Chưa check-in"}</td>
                <td>{diemDanh.checkOut || "Chưa check-out"}</td>
                <td>{diemDanh.note || "Không có ghi chú"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiemDanhList;
