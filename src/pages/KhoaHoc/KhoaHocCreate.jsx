import { useEffect, useState } from "react";
import { createKhoaHoc } from "../../services/khoaHocApi";
import api from "../../api/api";
import { useNavigate } from "react-router";

const KhoaHocCreate = () => {
  const [form, setForm] = useState({
    tenKhoaHoc: "",
    chuongTrinhDaoTaoId: "",
  });

  const [chuongTrinhList, setChuongTrinhList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChuongTrinh = async () => {
      try {
        const response = await api.get("/ChuongTrinhDaoTao");
        setChuongTrinhList(response.data);
      } catch (error) {
        console.error("Lỗi khi load chương trình đào tạo", error);
      }
    };

    fetchChuongTrinh();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name.includes("Id") ? parseInt(value) || "" : value;
    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tenKhoaHoc || !form.chuongTrinhDaoTaoId) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      await createKhoaHoc(form);
      navigate("/khoa-hoc");
    } catch (error) {
      alert("Lỗi khi tạo khóa học!");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Tạo mới Khóa học</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên khóa học</label>
          <input
            className="form-control"
            name="tenKhoaHoc"
            value={form.tenKhoaHoc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Chương trình đào tạo</label>
          <select
            className="form-select"
            name="chuongTrinhDaoTaoId"
            value={form.chuongTrinhDaoTaoId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn chương trình --</option>
            {chuongTrinhList.map((ct) => (
              <option key={ct.chuongTrinhDaoTaoId} value={ct.chuongTrinhDaoTaoId}>
                {ct.tenChuongTrinh}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
};

export default KhoaHocCreate;
