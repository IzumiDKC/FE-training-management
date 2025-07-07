import React, { useState } from "react";
import api from "../../api/api";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    hoTen: "",
    soCanCuoc: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/account/register", formData);

      setMessage(response.data.message || "🎉 Đăng ký thành công!");
      setFormData({
        email: "",
        hoTen: "",
        soCanCuoc: "",
        password: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Đăng ký thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card shadow border-0 rounded-4 p-4">
            <h2 className="text-center text-primary mb-4">
              📝 Tạo tài khoản mới
            </h2>

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
                  type="text"
                  name="hoTen"
                  className="form-control"
                  id="hoTen"
                  placeholder="Họ tên"
                  value={formData.hoTen}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="hoTen">👤 Họ tên</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="soCanCuoc"
                  className="form-control"
                  id="soCanCuoc"
                  placeholder="Số căn cước"
                  value={formData.soCanCuoc}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="soCanCuoc">🆔 Số căn cước</label>
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

              <div className="form-floating mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="confirmPassword">🔁 Xác nhận mật khẩu</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "🚀 Đăng ký"}
              </button>
            </form>

            <div className="text-center mt-4">
              <small className="text-muted">
                Đã có tài khoản?{" "}
                <a href="/login" className="text-decoration-none">
                  Đăng nhập tại đây
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
