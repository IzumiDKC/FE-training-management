import React, { useEffect, useState } from "react";
import { getDiemDanhByChiTietLopId } from "../services/diemDanhApi"; 
import { getDsHocVienByLopId } from "../services/dsHocVienApi"; 
// eslint-disable-next-line
import { formatDate, formatTime } from "../utils/formatTime";

const DiemDanhList = ({ chiTietLopId, lopId }) => { 
  const [diemDanhs, setDiemDanhs] = useState([]);
  const [hocViens, setHocViens] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDiemDanhByChiTietLopId(lopId, chiTietLopId);
        if (result.length === 0) {
          const hocVienResult = await getDsHocVienByLopId(lopId);
          setHocViens(hocVienResult); 
        } else {
          setDiemDanhs(result); 
        }
        setLoading(false);
      } catch (error) {
        setErrorMessage("Không có điểm danh cho buổi học này.");
        setLoading(false);
      }
    };

    if (chiTietLopId) {
      fetchData();
    }
  }, [chiTietLopId, lopId]);

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
          {diemDanhs.length === 0 && hocViens.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Không có điểm danh cho buổi học này và cũng không có học viên.
              </td>
            </tr>
          ) : (
            (diemDanhs.length > 0 ? diemDanhs : hocViens).map((item, index) => (
              <tr key={item.diemDanhId || item.hocVienId}>
                <td>{item.hocVienName || item.tenHocVien}</td>
                <td>{item.soCanCuoc}</td>
<td>{item.checkIn ? formatTime(item.checkIn) : "Chưa check-in"}</td>
<td>{item.checkOut ? formatTime(item.checkOut) : "Chưa check-out"}</td>

                <td>{item.note || "Không có ghi chú"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiemDanhList;
