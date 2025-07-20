// File: src/layouts/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Footer.css";

const Footer = () => {
  const { currentUser } = useAuth();
  const hasEvaluationAccess = currentUser?.roles?.some(role => 
    role === "Admin" || role === "GiangVien"
  );

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-brand-title">
              🎓 Hệ thống Quản lý Đào tạo
            </h3>
          <p className="footer-brand-description">
            <span>❝ Mở cánh cửa tri thức với nền tảng đào tạo thông minh và hiệu quả.</span><br />
            <span>❝ Nơi hành trình học tập được dẫn dắt bằng công nghệ và sự chuyên nghiệp.</span><br />
            <span>❝ Kết nối giảng viên, học viên và chương trình học trên một nền tảng hiện đại.</span>
          </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              🔗 Liên kết nhanh
            </h4>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/chuong-trinh">
                  <span className="footer-link-icon">📚</span>
                  Chương trình
                </Link>
              </li>
              <li className="footer-link">
                <Link to="/khoa-hoc">
                  <span className="footer-link-icon">🎯</span>
                  Khóa học
                </Link>
              </li>
              <li className="footer-link">
                <Link to="/lop">
                  <span className="footer-link-icon">🏫</span>
                  Lớp học
                </Link>
              </li>
              {hasEvaluationAccess && (
                <li className="footer-link">
                  <Link to="/danh-gia">
                    <span className="footer-link-icon">⭐</span>
                    Đánh giá
                  </Link>
                </li>
              )}
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
                <Link to="/support">
                  <span className="footer-link-icon">🎧</span>
                  Hỗ trợ kỹ thuật
                </Link>
              </li>
            </ul>

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
