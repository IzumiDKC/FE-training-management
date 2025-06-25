// File: src/pages/ChiTietLop/ChiTietLopPage.jsx
import React from "react";
import ChiTietLopList from "../../components/ChiTietLopList";

const ChiTietLopPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Quản lý buổi học</h2>
      <ChiTietLopList />
    </div>
  );
};

export default ChiTietLopPage;
