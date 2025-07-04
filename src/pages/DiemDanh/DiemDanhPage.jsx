import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DiemDanhList from "../../components/DiemDanhList";  
import { Button, Spinner } from "react-bootstrap"; 

const DiemDanhPage = () => {
  const { chiTietLopId, lopId } = useParams(); 
  const navigate = useNavigate();
  const [qrImage, setQrImage] = useState(null);
  const [countdown, setCountdown] = useState(120);
  const [isQrActive, setIsQrActive] = useState(false);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    setIsQrActive(false);
    setQrImage(null);
    setCountdown(120);
  }, [chiTietLopId]);

  const generateQR = (type) => {
    if (!chiTietLopId || !lopId) {
      console.error("chiTietLopId or lopId is missing");
      return;
    }

    const token = localStorage.getItem("token");

    setLoading(true); 

    fetch(`${process.env.REACT_APP_API_BASE_URL}/DiemDanh/GenerateQRBase64?lopId=${lopId}&chiTietLopId=${chiTietLopId}&type=${type}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setQrImage(data.image);
      setIsQrActive(true);
    })
    .catch((error) => {
      console.error("Lỗi khi lấy QR:", error);
      alert("Có lỗi xảy ra khi lấy mã QR.");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleBackToLop = () => {
    navigate(`/lop/${lopId}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📋 Điểm danh lớp học</h3>
        <Button variant="secondary" size="sm" onClick={handleBackToLop}>
          ⬅️ Quay lại
        </Button>
      </div>

      <div className="mb-3">
        <Button 
          variant="primary" 
          onClick={() => generateQR("checkin")}
          disabled={loading}
        >
          🔓 Tạo mã Check-in
        </Button>
        <Button 
          variant="secondary" 
          className="ms-2" 
          onClick={() => generateQR("checkout")}
          disabled={loading}
        >
          🔒 Tạo mã Check-out
        </Button>
      </div>

      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Đang tạo mã QR...</p>
        </div>
      )}

      {isQrActive && qrImage && (
        <div className="text-center mt-4">
          <img id="qr-image" src={qrImage} alt="QR code" className="img-fluid border rounded" style={{ maxWidth: "300px" }} />
          <div id="countdown" className="text-danger mt-2">
            Mã QR có hiệu lực trong {countdown}s
          </div>
        </div>
      )}

      <DiemDanhList chiTietLopId={chiTietLopId} lopId={lopId} />

    </div>
  );
};

export default DiemDanhPage;
