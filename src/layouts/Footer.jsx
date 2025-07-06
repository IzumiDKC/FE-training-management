// File: src/layouts/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 border-top py-3">
      <div className="container">
        <div className="text-muted">
          © {new Date().getFullYear()} Hệ thống Quản lý Đào tạo | Phát triển bởi Dien Nguyen
        </div>
        <div className="mt-2">
          <a href="https://www.facebook.com/Izumi.3107/" className="me-3 text-decoration-none text-primary">
            Facebook
          </a>
          <a href="https://www.linkedin.com/" className="me-3 text-decoration-none text-primary">
            LinkedIn
          </a>
          <a href="mailto:huudien111@gmail.com" className="text-decoration-none text-primary">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
