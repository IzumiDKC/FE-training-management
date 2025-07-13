import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  checkTokenValidity,
  getProfile,
  updateProfile,
} from "../../services/accountApi";

import AutoCompleteInput from "../../utils/AutoCompleteInput";
import "../../pages/css/account/ProfileInfo.css";

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
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-card error-alert">{tokenError}</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-card error-alert">{error}</div>
      </div>
    </div>
  );
  
  if (!user) return (
    <div className="profile-container">
      <div className="loading-spinner">🔄 Đang tải thông tin...</div>
    </div>
  );

  return (
    <div className="profile-container">
      {/* Medical decorative elements */}
      <div className="medical-element-1"></div>
      <div className="medical-element-2"></div>
      
      <div className="profile-content">
        <div className="profile-header">
          <h1 className="profile-title">Hồ Sơ Cá Nhân</h1>
          <p className="profile-subtitle">Quản lý thông tin tài khoản một cách hiện đại và chuyên nghiệp</p>
        </div>

        <div className="profile-card">
          <h3 className="card-title">
            <div className="card-icon">👤</div>
            Thông tin tài khoản
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Họ và tên</div>
              <div className="info-value">{user.hoTen}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Địa chỉ Email</div>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Số CCCD/CMND</div>
              <div className="info-value">{user.soCanCuoc}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Vai trò hệ thống</div>
              <div className="info-value">{Array.isArray(user.roles) ? user.roles.join(", ") : "Chưa có"}</div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h4 className="card-title">
            <div className="card-icon">📝</div>
            Thông tin bổ sung
          </h4>
          {message && <div className="alert-custom">{message}</div>}

          {!editMode ? (
            <>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Nơi công tác</div>
                  <div className="info-value">{profile.noiCongTac || "Chưa cập nhật"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Ngày sinh</div>
                  <div className="info-value">{profile.ngaySinh || "Chưa cập nhật"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Học hàm học vị</div>
                  <div className="info-value">{profile.hocHamHocVi || "Chưa cập nhật"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Thuộc bệnh viện</div>
                  <div className="info-value">{profile.thuocBenhVien ? "Có" : "Không"}</div>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-custom btn-primary-custom" onClick={() => setEditMode(true)}>
                  ✏️ Chỉnh sửa thông tin
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label className="form-label">Nơi công tác</label>
                <input
                  name="noiCongTac"
                  value={profile.noiCongTac}
                  onChange={handleChange}
                  placeholder="VD: Bệnh viện Ung Bướu Cơ Sở 2"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ngày sinh</label>
                <input
                  type="date"
                  name="ngaySinh"
                  value={profile.ngaySinh}
                  onChange={handleChange}
                  className="form-input"
                  min="1960-01-01"
                  max="2005-12-31"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Học hàm học vị</label>
                <AutoCompleteInput
                  value={profile.hocHamHocVi}
                  onChange={(newValue) =>
                    setProfile((prev) => ({ ...prev, hocHamHocVi: newValue }))
                  }
                />
              </div>

              <div className="form-group">
                <div className="form-checkbox">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="thuocBenhVien"
                      checked={profile.thuocBenhVien}
                      onChange={handleChange}
                      className="checkbox-input"
                      id="thuocBenhVien"
                    />
                    <label className="checkbox-label" htmlFor="thuocBenhVien">
                      Thuộc bệnh viện
                    </label>
                  </div>
                  <div className="checkbox-text">
                    Đánh dấu nếu bạn đang công tác tại bệnh viện Ung Bướu Cơ Sở 2
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-custom btn-success-custom" type="submit">
                  💾 Lưu thay đổi
                </button>
                <button 
                  className="btn-custom btn-secondary-custom" 
                  type="button" 
                  onClick={() => setEditMode(false)}
                >
                  ↩️ Hủy bỏ
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
