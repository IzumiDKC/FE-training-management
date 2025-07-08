import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./notFound.css"; 

const NotFound = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    timerRef.current = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timerRef.current);
    };
  }, [navigate]);

  const handleGoHome = () => {
    clearTimeout(timerRef.current);
    navigate("/");
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-3">🔍 Không tìm thấy trang</h2>
      <p className="lead mb-4 fw-bold">
        Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
      </p>

      <p className="fs-5 fw-semibold text-secondary">
        ⏳ Tự động quay về trang chủ sau {countdown} giây...
      </p>

      <button className="btn btn-outline-danger px-4 py-2 mt-2" onClick={handleGoHome}>
        🏠 Về trang chủ ngay
      </button>
    </div>
  );
};

export default NotFound;
