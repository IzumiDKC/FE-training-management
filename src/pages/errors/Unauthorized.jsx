// src/pages/errors/Unauthorized.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import gsap from "gsap";
import "./unauthorized.css";

const Unauthorized = () => {
  const navigate = useNavigate();
  const containerRef = useRef();
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef(null);

  useEffect(() => {
    // Hiệu ứng vào
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = interval;

    return () => clearInterval(timerRef.current);
  }, [navigate]);

  const handleGoHome = () => {
    clearInterval(timerRef.current);
    navigate("/");
  };

  return (
    <div ref={containerRef} className="container text-center unauthorized-container">
      <div className="unauthorized-icon">
        <FaLock />
      </div>
      <h1 className="display-1 text-warning">401</h1>
      <h2 className="mb-3">⚠️ Chưa được xác thực</h2>
      <p className="lead">Bạn cần đăng nhập để truy cập trang này.</p>

      <p className="fs-5 mb-4">
        <span className="countdown-text">
          ⏳ Chuyển về trang chủ sau <strong>{countdown}</strong> giây...
        </span>
      </p>

      <button className="btn btn-outline-primary px-4 py-2" onClick={handleGoHome}>
        🔙 Về trang chủ ngay
      </button>
    </div>
  );
};

export default Unauthorized;
