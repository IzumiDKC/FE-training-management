// src/pages/errors/Forbidden.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaBan } from "react-icons/fa";
import gsap from "gsap";
import "./forbidden.css";

const Forbidden = () => {
  const containerRef = useRef();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [navigate]);

  const handleReturnHome = () => {
    clearInterval(timerRef.current);
    navigate("/");
  };

  return (
    <div ref={containerRef} className="container text-center forbidden-container">
      <div className="forbidden-icon">
        <FaBan />
      </div>
      <h1 className="display-1 text-danger">403</h1>
      <h2 className="mb-3">🚫 Truy cập bị từ chối</h2>
      <p className="lead mb-4">
        Bạn không có quyền truy cập trang này. Sẽ quay lại trang chủ trong{" "}
        <span className="countdown">{countdown}</span> giây...
      </p>
      <button onClick={handleReturnHome} className="btn btn-outline-primary">
        🔙 Về trang chủ ngay
      </button>
    </div>
  );
};

export default Forbidden;
