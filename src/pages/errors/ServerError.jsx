import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { gsap } from "gsap";
import "./serverError.css";

const ServerError = () => {
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

    // Hiệu ứng chỉ cho phần tiêu đề
    gsap.fromTo(".server-icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

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
      <h1 className="display-1 text-danger server-icon">500</h1>
      <h2 className="mb-3">💥 Lỗi máy chủ</h2>
<p className="lead mb-4 fw-bold">
  Đã xảy ra lỗi nội bộ trên hệ thống. Chúng tôi đang cố gắng khắc phục sớm nhất có thể.
</p>


      <p className="fs-5 fw-bold text-danger" style={{ fontSize: "1.5rem" }}>
        ⏳ Tự động quay về trang chủ sau {countdown} giây...
      </p>

      <button className="btn btn-outline-danger mt-3 px-4 py-2" onClick={handleGoHome}>
        🔁 Về trang chủ ngay
      </button>
    </div>
  );
};

export default ServerError;
