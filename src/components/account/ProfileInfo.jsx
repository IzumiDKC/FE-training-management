import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  checkTokenValidity,
  getProfile,
  updateProfile,
} from "../../services/accountApi";

import AutoCompleteInput from "../../utils/AutoCompleteInput";

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

  if (tokenError) return <div className="alert alert-danger mt-4">{tokenError}</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!user) return <div className="text-center mt-5">🔄 Đang tải...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4 mb-5">
        <h3 className="text-primary mb-4">👤 Thông tin tài khoản</h3>
        <div className="row">
          <div className="col-md-6 mb-3"><strong>Họ tên:</strong> <div>{user.hoTen}</div></div>
          <div className="col-md-6 mb-3"><strong>Email:</strong> <div>{user.email}</div></div>
          <div className="col-md-6 mb-3"><strong>Số căn cước:</strong> <div>{user.soCanCuoc}</div></div>
          <div className="col-md-6 mb-3"><strong>Vai trò:</strong> <div>{Array.isArray(user.roles) ? user.roles.join(", ") : "Chưa có"}</div></div>
        </div>
      </div>

      <div className="card shadow p-4 rounded-4">
        <h4 className="text-success mb-4">📝 Thông tin bổ sung</h4>
        {message && <div className="alert alert-info">{message}</div>}

        {!editMode ? (
          <>
            <div className="mb-3"><strong>Nơi công tác:</strong> <div>{profile.noiCongTac || "Chưa cập nhật"}</div></div>
            <div className="mb-3"><strong>Ngày sinh:</strong> <div>{profile.ngaySinh || "Chưa cập nhật"}</div></div>
            <div className="mb-3"><strong>Học hàm học vị:</strong> <div>{profile.hocHamHocVi || "Chưa cập nhật"}</div></div>
            <div className="mb-3"><strong>Thuộc bệnh viện:</strong> <div>{profile.thuocBenhVien ? "Có" : "Không"}</div></div>

            <button className="btn btn-primary mt-2" onClick={() => setEditMode(true)}>
              ✏️ Thay đổi
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Nơi công tác</label>
              <input
                name="noiCongTac"
                value={profile.noiCongTac}
                onChange={handleChange}
                placeholder="VD: Bệnh viện Ung Bướu Cơ Sở 2"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label>Ngày sinh</label>
              <input
                type="date"
                name="ngaySinh"
                value={profile.ngaySinh}
                onChange={handleChange}
                className="form-control"
                min="1960-01-01"
                max="2005-12-31"
              />

            </div>

            <div className="mb-3">
              <label>Học hàm học vị</label>
              <AutoCompleteInput
                value={profile.hocHamHocVi}
                onChange={(newValue) =>
                  setProfile((prev) => ({ ...prev, hocHamHocVi: newValue }))
                }
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="thuocBenhVien"
                checked={profile.thuocBenhVien}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Thuộc bệnh viện</label>
              <div className="form-text">Tick nếu bạn đang công tác tại bệnh viện Ung Bướu Cơ Sở 2</div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-success" type="submit">💾 Lưu</button>
              <button className="btn btn-secondary" type="button" onClick={() => setEditMode(false)}>↩️ Huỷ</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
