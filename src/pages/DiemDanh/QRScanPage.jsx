// File: src/pages/QRScanPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Button,Container } from "react-bootstrap";
import { FaCheckCircle,FaExclamationTriangle,FaHome,FaCalendarAlt,FaSignInAlt,FaSignOutAlt,FaSpinner} from "react-icons/fa";
import "./QRScanPage.css";

const QRScanPage = () => {
  const { token } = useParams();
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchQRScan = async () => {
      try {
        const authToken = localStorage.getItem("token");

        const response = await fetch(`https://localhost:7247/api/DiemDanh/Scan?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Mã QR không hợp lệ hoặc đã hết hạn.");
        }

        setScanResult(data);
      } catch (error) {
        setErrorMessage(`Có lỗi xảy ra: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQRScan();
  }, [token]);

  return (
    <div className="qrscan-page-wrapper">
      {/* Background Effects */}
      <div className="qrscan-bg-effects">
        <div className="qrscan-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`qrscan-particle particle-${i + 1}`}></div>
          ))}
        </div>
        <div className="qrscan-shapes">
          <div className="qrscan-shape shape-circle"></div>
          <div className="qrscan-shape shape-square"></div>
          <div className="qrscan-shape shape-triangle"></div>
        </div>
      </div>

      <Container className="qrscan-container">
        <div className="qrscan-content">
          {errorMessage && (
            <div className="qrscan-error-card">
              <Card className="qrscan-card shadow-lg border-0">
                <Card.Body className="p-5 text-center">
                  <div className="qrscan-error-icon mb-4">
                    <FaExclamationTriangle />
                  </div>
                  <h3 className="qrscan-error-title mb-3">❌ Lỗi Quét QR</h3>
                  <p className="qrscan-error-message mb-4">{errorMessage}</p>
                  <Button 
                    variant="danger" 
                    size="lg" 
                    className="qrscan-btn"
                    onClick={() => window.location.href = "/"}
                  >
                    <FaHome className="me-2" />
                    Quay lại trang chủ
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}

          {loading ? (
            <div className="qrscan-loading-card">
              <Card className="qrscan-card shadow-lg border-0">
                <Card.Body className="p-5 text-center">
                  <div className="qrscan-loading-icon mb-4">
                    <FaSpinner className="qrscan-spin" />
                  </div>
                  <h3 className="qrscan-loading-title mb-3">Đang xử lý...</h3>
                  <p className="qrscan-loading-message">Vui lòng chờ trong giây lát</p>
                  <div className="qrscan-progress-bar">
                    <div className="qrscan-progress-fill"></div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ) : (
            scanResult && (
              <div className="qrscan-success-card">
                <Card className="qrscan-card shadow-lg border-0">
                  <Card.Body className="p-5">
                    <div className="text-center mb-4">
                      <div className="qrscan-success-icon mb-3">
                        <FaCheckCircle />
                      </div>
                      <h3 className="qrscan-success-title mb-2">Thành công!</h3>
                      <p className="qrscan-success-message">{scanResult.message}</p>
                    </div>

                    <div className="qrscan-info-grid">
                      <div className="qrscan-info-item">
                        <div className="qrscan-info-icon checkin">
                          <FaSignInAlt />
                        </div>
                        <div className="qrscan-info-content">
                          <div className="qrscan-info-label">Check-in</div>
                          <div className="qrscan-info-value">
                            {scanResult.checkInTime || "Chưa check-in"}
                          </div>
                        </div>
                      </div>

                      <div className="qrscan-info-item">
                        <div className="qrscan-info-icon checkout">
                          <FaSignOutAlt />
                        </div>
                        <div className="qrscan-info-content">
                          <div className="qrscan-info-label">Check-out</div>
                          <div className="qrscan-info-value">
                            {scanResult.checkOutTime || "Chưa check-out"}
                          </div>
                        </div>
                      </div>

                      <div className="qrscan-info-item full-width">
                        <div className="qrscan-info-icon date">
                          <FaCalendarAlt />
                        </div>
                        <div className="qrscan-info-content">
                          <div className="qrscan-info-label">Ngày</div>
                          <div className="qrscan-info-value">{scanResult.date}</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <Button 
                        variant="success" 
                        size="lg" 
                        className="qrscan-btn"
                        onClick={() => window.location.href = "/"}
                      >
                        <FaHome className="me-2" />
                        Quay lại trang chủ
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default QRScanPage;
