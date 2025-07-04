import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError(null);

    try {
      const response = await axios.post(
        "https://localhost:7247/api/account/login",
        formData,
        { withCredentials: true }
      );

      setMessage(response.data.message || "🎉 Đăng nhập thành công!");

localStorage.setItem("token", response.data.token); 
// console.log("Token lưu vào localStorage:", response.data.token);

      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });

      await fetchUser();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Đăng nhập thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-12">
          <div className="card shadow border-0 rounded-4 p-4">
            <h2 className="text-center text-primary mb-4">🔐 Đăng nhập</h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">📧 Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">🔒 Mật khẩu</label>
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Nhớ tôi
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "🚀 Đăng nhập"}
              </button>
            </form>

            <div className="text-center mt-4">
              <small className="text-muted">
                Chưa có tài khoản?{" "}
                <a href="/register" className="text-decoration-none">
                  Đăng ký tại đây
                </a>
              </small>
              <br />
              <small className="text-muted">
                <a href="/forgot-password" className="text-decoration-none">
                  Quên mật khẩu?
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
