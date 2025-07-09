// src/pages/Lop/ChonHocVien.jsx
import React, { useEffect, useState } from "react";
import { getHocVienSelector, themHocVienVaoLop } from "../../services/lopApi";
import { useParams, useNavigate } from "react-router";

const ChonHocVien = () => {
  const { id: lopId } = useParams();
  const [hocViens, setHocViens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHocVienSelector(lopId).then(setHocViens);
  }, [lopId]);

  const handleChange = (index) => {
    const updated = [...hocViens];
    updated[index].isSelected = !updated[index].isSelected;
    setHocViens(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await themHocVienVaoLop(lopId, hocViens);
      navigate("/lop");
    } catch (err) {
      alert("Thêm học viên thất bại!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>👥 Chọn học viên cho lớp #{lopId}</h3>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Họ tên</th>
              <th>Số căn cước</th>
              <th>UserId</th>
            </tr>
          </thead>
          <tbody>
            {hocViens.map((hv, i) => (
              <tr key={hv.userId}>
                <td>
                  <input
                    type="checkbox"
                    checked={hv.isSelected}
                    onChange={() => handleChange(i)}
                  />
                </td>
                <td>{hv.hoTen}</td>
                <td>{hv.soCanCuoc}</td>
                <td><code>{hv.userId}</code></td>
              </tr>
            ))}
          </tbody>

        </table>
        <button className="btn btn-primary">✅ Thêm vào lớp</button>
      </form>
    </div>
  );
};

export default ChonHocVien;
