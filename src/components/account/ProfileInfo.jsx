import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  checkTokenValidity,
  getProfile,
  updateProfile,
} from "../../services/accountApi";

import AutoCompleteInput from "../../utils/AutoCompleteInput";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    hoTen: "",
    noiCongTac: "",
    ngaySinh: "",
    hocHamHocVi: "",
    thuocBenhVien: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");

  useEffect(() => {
    checkTokenValidity()
      .then(() => {
        getCurrentUser().then(setUser).catch(() => {
          setError("Không thể tải thông tin. Có thể bạn chưa đăng nhập.");
        });

        getProfile().then((data) => {
          const isEmptyDate = !data.ngaySinh || data.ngaySinh.startsWith("0001");
          setProfile({
          ...data,
          hocHamHocVi: data.hocHamHocVi || "",
          ngaySinh: isEmptyDate ? "2000-01-01" : data.ngaySinh.slice(0, 10),
          });
        });
      })
      .catch(() => {
        setTokenError("Token không hợp lệ. Bạn cần đăng nhập lại.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setMessage("✅ Cập nhật thông tin thành công!");
      setEditMode(false);
    } catch {
      setMessage("❌ Có lỗi khi cập nhật thông tin.");
    }
  };

  if (tokenError) return (
    <div className="profile-wrapper">
      <div className="error-state">
        <div className="error-bubble">
          <div className="error-icon">🔒</div>
          <h3>Phiên đăng nhập hết hạn</h3>
          <p>{tokenError}</p>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="profile-wrapper">
      <div className="error-state">
        <div className="error-bubble">
          <div className="error-icon">⚠️</div>
          <h3>Có lỗi xảy ra</h3>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
  
  if (!user) return (
    <div className="profile-wrapper">
      <div className="loading-state">
        <div className="loading-orb">
          <div className="orb"></div>
          <div className="orb-shadow"></div>
        </div>
        <p className="loading-text">Đang tải thông tin...</p>
      </div>
    </div>
  );
 
  return (
    <div className="profile-wrapper">
      {/* Ethereal Background */}
      <div className="ethereal-bg">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="sparkles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`sparkle sparkle-${i % 3 + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Floating Header */}
      <div className="floating-header">
        <div className="header-glass">
          <div className="avatar-container">
            <div className="avatar-ring">
              <div className="avatar-inner">
                <span className="avatar-emoji">👤</span>
              </div>
            </div>
          </div>
          <div className="header-content">
            <h1 className="main-title">Hồ Sơ Cá Nhân</h1>
          </div>
        </div>
      </div>

      {/* Content Bubbles */}
      <div className="content-bubbles">
        {/* Account Info Bubble */}
        <div className="info-bubble account-bubble">
          <div className="bubble-header">
            <div className="bubble-icon">
              <span className="icon-glow">🏠</span>
            </div>
            <div className="bubble-title">
              <h3>Thông tin tài khoản</h3>
            </div>
          </div>
          
          <div className="bubble-content">
            <div className="info-mosaic">
              <div className="mosaic-tile">
                <div className="tile-header">
                  <span className="tile-icon">👤</span>
                  <span className="tile-label">Họ và tên</span>
                </div>
                <div className="tile-value">{user.hoTen}</div>
              </div>
              
              <div className="mosaic-tile">
                <div className="tile-header">
                  <span className="tile-icon">📧</span>
                  <span className="tile-label">Email</span>
                </div>
                <div className="tile-value">{user.email}</div>
              </div>
              
              <div className="mosaic-tile">
                <div className="tile-header">
                  <span className="tile-icon">🆔</span>
                  <span className="tile-label">CCCD/CMND</span>
                </div>
                <div className="tile-value">{user.soCanCuoc}</div>
              </div>
              
              <div className="mosaic-tile role-tile">
                <div className="tile-header">
                  <span className="tile-icon">🎭</span>
                  <span className="tile-label">Vai trò</span>
                </div>
                <div className="tile-value">
                  <div className="role-pills">
                    {Array.isArray(user.roles) ? 
                      user.roles.map((role, index) => (
                        <span key={index} className="role-pill">{role}</span>
                      )) : 
                      <span className="role-pill empty">Chưa có</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Bubble */}
        <div className="info-bubble profile-bubble">
          <div className="bubble-header">
            <div className="bubble-icon">
              <span className="icon-glow">📝</span>
            </div>
            <div className="bubble-title">
              <h4>Thông tin bổ sung</h4>
            </div>
            {!editMode && (
              <button 
                className="edit-floating-btn"
                onClick={() => setEditMode(true)}
              >
                <span className="btn-sparkle">✨</span>
                Chỉnh sửa
              </button>
            )}
          </div>

          <div className="bubble-content">
            {message && (
              <div className="message-float">

                <span className="message-text">{message}</span>
              </div>
            )}

            {!editMode ? (
              <div className="info-mosaic">
                <div className="mosaic-tile">
                  <div className="tile-header">
                    <span className="tile-icon">🏢</span>
                    <span className="tile-label">Nơi công tác</span>
                  </div>
                  <div className="tile-value">{profile.noiCongTac || "Chưa cập nhật"}</div>
                </div>
                
                <div className="mosaic-tile">
                  <div className="tile-header">
                    <span className="tile-icon">🎂</span>
                    <span className="tile-label">Ngày sinh</span>
                  </div>
                  <div className="tile-value">{profile.ngaySinh || "Chưa cập nhật"}</div>
                </div>
                
                <div className="mosaic-tile">
                  <div className="tile-header">
                    <span className="tile-icon">🎓</span>
                    <span className="tile-label">Học hàm học vị</span>
                  </div>
                  <div className="tile-value">{profile.hocHamHocVi || "Chưa cập nhật"}</div>
                </div>
                
                <div className="mosaic-tile status-tile">
                  <div className="tile-header">
                    <span className="tile-icon">🏥</span>
                    <span className="tile-label">Thuộc bệnh viện</span>
                  </div>
                  <div className="tile-value">
                    <span className={`status-orb ${profile.thuocBenhVien ? 'active' : 'inactive'}`}>
                      {profile.thuocBenhVien ? "Có" : "Không"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ethereal-form">
                <div className="form-constellation">
                  <div className="form-row">
                    <div className="input-nebula">
                      <label className="nebula-label">
                        <span className="label-star">🏢</span>
                        Nơi công tác
                      </label>
                      <div className="input-orbit">
                        <input
                          name="noiCongTac"
                          value={profile.noiCongTac}
                          onChange={handleChange}
                          placeholder="VD: Bệnh viện Ung Bướu Cơ Sở 2"
                          className="cosmic-input"
                        />
                        <div className="input-aurora"></div>
                      </div>
                    </div>

                    <div className="input-nebula">
                      <label className="nebula-label">
                        <span className="label-star">🎂</span>
                        Ngày sinh
                      </label>
                      <div className="input-orbit">
                        <input
                          type="date"
                          name="ngaySinh"
                          value={profile.ngaySinh}
                          onChange={handleChange}
                          className="cosmic-input"
                          min="1960-01-01"
                          max="2005-12-31"
                        />
                        <div className="input-aurora"></div>
                      </div>
                    </div>
                  </div>

                  <div className="input-nebula">
                    <label className="nebula-label">
                      <span className="label-star">🎓</span>
                      Học hàm học vị
                    </label>
                    <div className="autocomplete-orbit">
                      <AutoCompleteInput
                        value={profile.hocHamHocVi || ""}
                        onChange={(newValue) =>
                          setProfile((prev) => ({ ...prev, hocHamHocVi: newValue }))
                        }
                      />
                    </div>
                  </div>

                  <div className="checkbox-constellation">
                    <div className="cosmic-checkbox">
                      <label className="checkbox-orbit">
                        <input
                          type="checkbox"
                          name="thuocBenhVien"
                          checked={profile.thuocBenhVien}
                          onChange={handleChange}
                          className="hidden-check"
                          id="thuocBenhVien"
                        />
                        <span className="check-planet"></span>
                        <span className="check-label">
                          <span className="check-icon">🏥</span>
                          Thuộc bệnh viện
                        </span>
                      </label>
                      <div className="check-description">
                        Đánh dấu nếu bạn đang công tác tại bệnh viện Ung Bướu Cơ Sở 2
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Action Buttons */}
                <div className="action-galaxy">
                  <button 
                    type="button"
                    className="cosmic-btn cancel-btn"
                    onClick={() => setEditMode(false)}
                  >
                    <span className="btn-constellation">↩️</span>
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    className="cosmic-btn save-btn"
                  >
                    <span className="btn-constellation">💾</span>
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;