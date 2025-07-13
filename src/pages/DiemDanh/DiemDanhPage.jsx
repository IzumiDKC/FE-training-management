// File: src/pages/DiemDanh/DiemDanhPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DiemDanhList from "../../components/DiemDanhList";  
import { Button, Spinner, Card, Row, Col, Badge, Alert } from "react-bootstrap"; 
import { resetAllCheckIn, resetAllCheckOut } from "../../services/diemDanhApi";
import { 
  FaArrowLeft,
  FaQrcode,
  FaSignInAlt,
  FaSignOutAlt,
  FaRedo,
  FaClock,
  FaUserCheck,
  FaShieldAlt
} from "react-icons/fa";
import "../css/DiemDanh/DiemDanhPage.css";

const DiemDanhPage = () => {
  const { chiTietLopId, lopId } = useParams(); 
  const navigate = useNavigate();
  const [qrImage, setQrImage] = useState(null);
  const [countdown, setCountdown] = useState(120);
  const [isQrActive, setIsQrActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrType, setQrType] = useState(null);

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
    setQrType(type);
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

  const handleResetCheckIn = async () => {
    if (!chiTietLopId) return;
    try {
      await resetAllCheckIn(chiTietLopId);
      alert("✅ Đã reset tất cả Check-in.");
    } catch (err) {
      console.error("Error resetting check-in:", err);
      alert("❌ Có lỗi xảy ra khi reset Check-in.");
    }
  };

  const handleResetCheckOut = async () => {
    if (!chiTietLopId) return;
    try {
      await resetAllCheckOut(chiTietLopId);
      alert("✅ Đã reset tất cả Check-out.");
    } catch (err) {
      console.error("Error resetting check-out:", err);
      alert("❌ Có lỗi xảy ra khi reset Check-out.");
    }
  };

  const handleBackToLop = () => {
    navigate(`/lop/${lopId}`);
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="diemdanh-modern-wrapper">
      {/* Background Effects */}
      <div className="diemdanh-bg-effects">
        <div className="diemdanh-particles"></div>
        <div className="diemdanh-waves"></div>
      </div>

      <div className="container-fluid diemdanh-container">
        {/* Header Section */}
        <Card className="diemdanh-header-card shadow-lg border-0 mb-4">
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col xs="auto">
                <Button 
                  variant="outline-primary" 
                  size="lg"
                  className="diemdanh-back-btn rounded-circle p-3"
                  onClick={handleBackToLop}
                >
                  <FaArrowLeft />
                </Button>
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  <div className="diemdanh-icon-wrapper me-3">
                    <FaUserCheck className="diemdanh-main-icon" />
                  </div>
                  <div>
                    <h2 className="mb-1 diemdanh-title">
                      Điểm Danh Lớp Học
                    </h2>
                    <p className="mb-0 text-muted">Quản lý điểm danh học viên</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          {/* Control Panel */}
          <Col lg={6} className="mb-4">
            <Card className="diemdanh-control-card h-100 shadow border-0">
              <Card.Header className="bg-gradient-primary text-white border-0">
                <div className="d-flex align-items-center">
                  <FaQrcode className="me-2" />
                  <h5 className="mb-0">Bảng Điều Khiển</h5>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-4">
                  <h6 className="text-primary mb-3">
                    <FaQrcode className="me-2" />
                    Tạo Mã QR
                  </h6>
                  <div className="d-grid gap-3">
                    <Button 
                      variant="success"
                      size="lg"
                      className="diemdanh-action-btn"
                      onClick={() => generateQR("checkin")}
                      disabled={loading}
                    >
                      <FaSignInAlt className="me-2" />
                      🔓 Tạo mã Check-in
                    </Button>
                    <Button 
                      variant="warning"
                      size="lg"
                      className="diemdanh-action-btn"
                      onClick={() => generateQR("checkout")}
                      disabled={loading}
                    >
                      <FaSignOutAlt className="me-2" />
                      🔒 Tạo mã Check-out
                    </Button>
                  </div>
                </div>

                <hr className="my-4" />

                <div>
                  <h6 className="text-danger mb-3">
                    <FaRedo className="me-2" />
                    Reset Dữ Liệu
                  </h6>
                  <div className="d-grid gap-3">
                    <Button 
                      variant="danger"
                      size="lg"
                      className="diemdanh-action-btn"
                      onClick={handleResetCheckIn}
                      disabled={loading}
                    >
                      <FaRedo className="me-2" />
                      ♻️ Reset All Check-in
                    </Button>
                    <Button 
                      variant="outline-warning"
                      size="lg"
                      className="diemdanh-action-btn"
                      onClick={handleResetCheckOut}
                      disabled={loading}
                    >
                      <FaRedo className="me-2" />
                      ♻️ Reset All Check-out
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* QR Code Display */}
          <Col lg={6} className="mb-4">
            <Card className="diemdanh-qr-card h-100 shadow border-0">
              <Card.Header className="bg-gradient-info text-white border-0">
                <div className="d-flex align-items-center">
                  <FaShieldAlt className="me-2" />
                  <h5 className="mb-0">Mã QR Điểm Danh</h5>
                </div>
              </Card.Header>
              <Card.Body className="p-4 text-center">
                {loading ? (
                  <div className="diemdanh-loading-section py-5">
                    <Spinner 
                      animation="border" 
                      variant="primary" 
                      size="lg"
                      className="mb-3"
                    />
                    <p className="text-muted mb-0">Đang tạo mã QR...</p>
                  </div>
                ) : isQrActive && qrImage ? (
                  <div className="diemdanh-qr-display">
                    <Badge 
                      bg={qrType === 'checkin' ? 'success' : 'warning'} 
                      className="mb-3 px-3 py-2 fs-6"
                    >
                      {qrType === 'checkin' ? 'Check-in' : 'Check-out'} QR Code
                    </Badge>
                    
                    <div className="diemdanh-qr-container mb-3">
                      <img 
                        id="qr-image" 
                        src={qrImage} 
                        alt="QR code" 
                        className="diemdanh-qr-image shadow"
                      />
                      <div className="diemdanh-qr-overlay">
                        <FaShieldAlt />
                      </div>
                    </div>

                    <Alert variant="danger" className="diemdanh-countdown-alert">
                      <FaClock className="me-2" />
                      <span id="countdown">
                        Mã QR có hiệu lực trong <strong>{formatCountdown(countdown)}</strong>
                      </span>
                    </Alert>
                  </div>
                ) : (
                  <div className="diemdanh-no-qr py-5">
                    <div className="diemdanh-qr-placeholder mb-3">
                      <FaQrcode />
                    </div>
                    <p className="text-muted mb-0">
                      Nhấn vào nút trên để tạo mã QR điểm danh
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Attendance List */}
        <Card className="diemdanh-list-card shadow border-0">
          <Card.Header className="bg-gradient-secondary text-white border-0">
            <div className="d-flex align-items-center">
              <FaUserCheck className="me-2" />
              <h5 className="mb-0">Danh Sách Điểm Danh</h5>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="diemdanh-list-wrapper">
              <DiemDanhList chiTietLopId={chiTietLopId} lopId={lopId} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DiemDanhPage;
