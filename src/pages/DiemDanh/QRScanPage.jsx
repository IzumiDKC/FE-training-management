// File: src/pages/QRScanPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Button, Alert, Spinner, Container } from "react-bootstrap";

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
    <Container className="mt-5">
      {errorMessage && (
        <Alert variant="danger">
          <h4>❌ Lỗi</h4>
          <p>{errorMessage}</p>
        </Alert>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Đang xử lý...</p>
        </div>
      ) : (
        scanResult && (
          <Card className="shadow-lg border-0 rounded p-4">
            <Card.Body>
              <Card.Title className="text-center text-success">
                <i className="bi bi-check-circle" style={{ fontSize: "3rem" }}></i>
                <h3>Thành công!</h3>
              </Card.Title>
              <Card.Text className="text-center text-muted">
                <p>{scanResult.message}</p>
                <div className="my-3">
                  <p><strong>Check-in:</strong> {scanResult.checkInTime}</p>
                  <p><strong>Check-out:</strong> {scanResult.checkOutTime}</p>
                  <p><strong>Ngày:</strong> {scanResult.date}</p>
                </div>
                <Button variant="success" size="lg" onClick={() => window.location.href = "/"}>
                  Quay lại trang chủ
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      )}
    </Container>
  );
};

export default QRScanPage;
