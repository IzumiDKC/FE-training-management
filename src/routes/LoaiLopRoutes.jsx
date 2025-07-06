// File: src/routes/LoaiLopRoutes.jsx
import React from "react";
import { Route } from "react-router";

import LoaiLopPage from "../pages/LoaiLop/LoaiLopPage";
import LoaiLopCreate from "../pages/LoaiLop/LoaiLopCreate";
import LoaiLopEdit from "../pages/LoaiLop/LoaiLopEdit";
import LoaiLopDetail from "../pages/LoaiLop/LoaiLopDetail";
import ChonHocVien from "../pages/Lop/ChonHocVien";

const LoaiLopRoutes = () => (
  <>
    <Route path="loai-lop" element={<LoaiLopPage />} />
    <Route path="loai-lop/create" element={<LoaiLopCreate />} />
    <Route path="loai-lop/edit/:id" element={<LoaiLopEdit />} />
    <Route path="loai-lop/:id" element={<LoaiLopDetail />} />
    <Route path="lop/chon-hoc-vien/:id" element={<ChonHocVien />} />
  </>
);

export default LoaiLopRoutes;
