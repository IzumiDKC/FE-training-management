// File: src/pages/account/ForgotPasswordPage.jsx
import React, { useState } from "react";
import api from "../../../api/api";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/account/forgot-password", { email });
      setMessage(response.data.message || "Yêu cầu đặt lại mật khẩu đã được gửi.");
    } catch (err) {
      setError(err.response?.data?.error || "Có lỗi xảy ra khi gửi yêu cầu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="text-center text-primary mb-4">🔐 Quên mật khẩu</h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Nhập địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">📧 Email</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu đặt lại mật khẩu"}
              </button>
            </form>

            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none">
                Quay lại đăng nhập
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;