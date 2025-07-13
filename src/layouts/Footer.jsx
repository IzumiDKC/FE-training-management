// File: src/layouts/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-brand-title">
              🎓 Hệ thống Quản lý Đào tạo
            </h3>
            <p className="footer-brand-description">
              Nền tảng giáo dục số cung cấp quản lý chương trình, khóa học, lớp học và học 
              viên một cách chuyên nghiệp và hiện đại.
            </p>
            <div className="footer-brand-quote">
              "Giáo dục là chìa khóa mở ra cánh cửa tương lai."
              <br />- Nelson Mandela
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">
              🔗 Liên kết nhanh
            </h4>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="/chuong-trinh">
                  <span className="footer-link-icon">📚</span>
                  Chương trình
                </a>
              </li>
              <li className="footer-link">
                <a href="/khoa-hoc">
                  <span className="footer-link-icon">🎯</span>
                  Khóa học
                </a>
              </li>
              <li className="footer-link">
                <a href="/lop">
                  <span className="footer-link-icon">🏫</span>
                  Lớp học
                </a>
              </li>
              <li className="footer-link">
                <a href="/danh-gia">
                  <span className="footer-link-icon">⭐</span>
                  Đánh giá
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-section-title">
              📞 Liên hệ
            </h4>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="mailto:huudien111@gmail.com">
                  <span className="footer-link-icon">✉️</span>
                  huudien111@gmail.com
                </a>
              </li>
              <li className="footer-link">
                <a href="tel:+84123456789">
                  <span className="footer-link-icon">📱</span>
                  +84 123 456 789
                </a>
              </li>
              <li className="footer-link">
                <a href="/support">
                  <span className="footer-link-icon">🎧</span>
                  Hỗ trợ kỹ thuật
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="footer-social">
              <a 
                href="https://www.facebook.com/Izumi.3107/" 
                className="footer-social-link facebook"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                📘
              </a>
              <a 
                href="https://www.linkedin.com/" 
                className="footer-social-link linkedin"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                💼
              </a>
              <a 
                href="mailto:huudien111@gmail.com" 
                className="footer-social-link email"
                title="Email"
              >
                📧
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © <span className="footer-year">{new Date().getFullYear()}</span> Hệ thống Quản lý Đào tạo | 
            Phát triển bởi <span className="footer-highlight">Dien Nguyen</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
