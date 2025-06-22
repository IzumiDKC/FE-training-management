// src/pages/ChuongTrinh/ChuongTrinhPage.jsx
import React from "react";
import ChuongTrinhList from "../../components/ChuongTrinhList";

const ChuongTrinhPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 Danh sách Chương trình đào tạo</h2>
      <ChuongTrinhList />
    </div>
  );
};

export default ChuongTrinhPage;