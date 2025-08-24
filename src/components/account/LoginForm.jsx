import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import gsap from "gsap";
import "./loginForm.css";
import api from "../../api/api";
import { useLocation } from "react-router";

const LoginForm = () => {

const formRef = useRef(null);
const location = useLocation();
const returnUrl = new URLSearchParams(location.search).get("returnUrl") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError(null);

    try {
      const response = await api.post("/account/login", formData);

      const { token, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));

      setMessage("🎉 Đăng nhập thành công!");
      setFormData({ email: "", password: "", rememberMe: false });

      await fetchUser();
window.location.href = returnUrl;

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Đăng nhập thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div ref={formRef} className="login-card shadow rounded-4 p-4">
        <h2 className="text-center mb-4 text-primary">🔐 Đăng nhập</h2>

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

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control password-input"
              id="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">🔒 Mật khẩu</label>

            <span
              className="eye-icon position-absolute top-50 end-0 translate-middle-y me-3"
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
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
            {isLoading ? (
              <div className="spinner-border spinner-border-sm text-light" />
            ) : (
              "🚀 Đăng nhập"
            )}
          </button>
        </form>

        <div className="text-center mt-4 small text-muted">
          <p>
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-decoration-none">
              Đăng ký tại đây
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="text-decoration-none">
              Quên mật khẩu?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
