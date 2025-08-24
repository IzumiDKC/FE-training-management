import React, { useEffect, useState } from "react";
import { getDiemDanhByChiTietLopId } from "../services/diemDanhApi";
import { getDsHocVienByLopId } from "../services/dsHocVienApi";
import { formatTime } from "../utils/formatTime";
import { Button } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";
import { submitDiemDanh } from "../services/diemDanhApi";

const DiemDanhList = ({ chiTietLopId, lopId, onManualCheck }) => {
  const [diemDanhs, setDiemDanhs] = useState([]);
  const [hocViens, setHocViens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteInput, setNoteInput] = useState("");

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

  const renderRows = () => {
    const list = diemDanhs.length > 0 ? diemDanhs : hocViens;

    return list.map((item) => {
      const hocVienId = item.hocVienId || item.id;
      const hoTen = item.hocVienName || item.tenHocVien || "Không rõ";
      const soCanCuoc = item.soCanCuoc || "---";
      const checkIn = item.checkIn ? formatTime(item.checkIn) : "Chưa check-in";
      const checkOut = item.checkOut ? formatTime(item.checkOut) : "Chưa check-out";
      const note = item.note || "Không có ghi chú";

      return (
        <tr key={hocVienId}>
          <td>{hoTen}</td>
          <td>{soCanCuoc}</td>
          <td>{checkIn}</td>
          <td>{checkOut}</td>
          <td>
            {editingNoteId === hocVienId ? (
              <div className="d-flex gap-2">
                <input
                  className="form-control form-control-sm"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                />
                <Button
                  size="sm"
                  variant="success"
                  onClick={async () => {
                    const payload = {
                      ChiTietLopId: parseInt(chiTietLopId),
                      HocVienId: parseInt(hocVienId),
                      NgayCheck: new Date().toISOString(),
                      Note: noteInput
                    };
                    try {
                      await submitDiemDanh(payload);
                      alert("✅ Đã cập nhật ghi chú.");
                      setEditingNoteId(null);
                      const updated = await getDiemDanhByChiTietLopId(lopId, chiTietLopId);
                      setDiemDanhs(updated);
                    } catch (err) {
                      alert("❌ Lỗi khi lưu ghi chú.");
                      console.error(err);
                    }
                  }}
                >
                  <FaSave />
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <span>{note}</span>
                <FaEdit
                  role="button"
                  className="text-primary ms-2"
                  onClick={() => {
                    setEditingNoteId(hocVienId);
                    setNoteInput(item.note || "");
                  }}
                />
              </div>
            )}
          </td>
          <td>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => onManualCheck(hocVienId, "checkin")}
              className="me-2"
            >
              + Check-in
            </Button>
            <Button
              variant="outline-warning"
              size="sm"
              onClick={() => onManualCheck(hocVienId, "checkout")}
            >
              + Check-out
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Học viên</th>
            <th>Số CCCD</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {diemDanhs.length === 0 && hocViens.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không có học viên hoặc dữ liệu điểm danh cho buổi học này.
              </td>
            </tr>
          ) : (
            renderRows()
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiemDanhList;
