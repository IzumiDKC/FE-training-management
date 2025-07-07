// File: src/components/account/manage/ResendEmailForm.jsx
import React, { useState } from "react";
import api from "../../../api/api";
const ResendEmailForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/account/resend-confirmation", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center">📩 Gửi lại email xác nhận</h3>
      <form onSubmit={handleResend} className="mt-4">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi lại email xác nhận"}
        </button>
      </form>
    </div>
  );
};

export default ResendEmailForm;
