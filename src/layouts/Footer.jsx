// File: src/layouts/Footer.jsx
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container footer-content">
        <div className="footer-left">
          <span className="footer-logo">🎓</span>
          <span className="footer-title ms-2">Hệ thống Quản lý Đào tạo</span>
        </div>
        <div className="footer-center">
          <a
            href="https://www.facebook.com/Izumi.3107/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="mailto:huudien111@gmail.com"
            className="footer-icon"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
        <div className="footer-right">
          © {new Date().getFullYear()} | Phát triển bởi{" "}
          <span className="footer-dev">Dien Nguyen</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
