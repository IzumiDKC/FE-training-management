import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xác nhận...");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    if (!userId || !code) {
      setMessage("Thiếu thông tin xác nhận.");
      return;
    }

    axios
      .get(`https://localhost:7247/api/account/confirm-email?userId=${userId}&code=${code}`)
      .then((res) => {
        setMessage("🎉 Xác nhận email thành công! Bạn có thể đăng nhập.");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setMessage("❌ Xác nhận thất bại: " + (err.response?.data?.error || "Lỗi không xác định."));
      });
  }, [searchParams, navigate]);

  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary">📧 Xác nhận Email</h2>
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default ConfirmEmailPage;
