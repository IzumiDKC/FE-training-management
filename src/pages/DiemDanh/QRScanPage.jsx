import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Button, Alert, Spinner, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const QRScanPage = () => {
  const { token } = useParams();  
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (token) {
    const authToken = localStorage.getItem("token");

    fetch(`https://localhost:7247/api/DiemDanh/Scan?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}` 
      }
    })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Mã QR không hợp lệ hoặc đã hết hạn.");
        }
        if (response.status === 400) {
          throw new Error("Mã QR không hợp lệ hoặc đã hết hạn.");
        }
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => {
      if (data.success) {
        setScanResult(data); 
      } else {
        setErrorMessage(data.message); 
      }
    })
    .catch((error) => {
      console.error("Error:", error);  
      setErrorMessage(`Có lỗi xảy ra: ${error.message}`);
    })
    .finally(() => setLoading(false));  
  }
}, [token]);  



  return (
    <Container className="mt-5">
      {errorMessage && (
        <Alert variant="danger">
          <h4>Error!</h4>
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
