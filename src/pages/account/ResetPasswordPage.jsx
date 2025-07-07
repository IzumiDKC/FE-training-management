import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    if (email && code) {
      setFormData((prev) => ({
        ...prev,
        email,
        code,
      }));
    } else {
      setError("Link không hợp lệ hoặc thiếu thông tin.");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://localhost:7247/api/account/reset-password",
        formData
      );
      setMessage(response.data.message || "Đặt lại mật khẩu thành công!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Có lỗi xảy ra.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">🔑 Đặt lại mật khẩu</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="code" value={formData.code} />

        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mật khẩu mới"
            onChange={handleChange}
            required
          />
          <label>Mật khẩu mới</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Xác nhận mật khẩu"
            onChange={handleChange}
            required
          />
          <label>Xác nhận mật khẩu</label>
        </div>

        <button className="btn btn-primary w-100">Xác nhận</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
