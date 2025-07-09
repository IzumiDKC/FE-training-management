// src/routes/DangKyKhoaHocRoutes.jsx
import { Route } from "react-router";
import DangKyKhoaHocPage from "../pages/DangKyKhoaHoc/DangKyKhoaHocPage";
import DangKyKhoaHocCreate from "../pages/DangKyKhoaHoc/DangKyKhoaHocCreate";

const DangKyKhoaHocRoutes = () => (
  <>
    <Route path="/dang-ky-khoa-hoc" element={<DangKyKhoaHocPage />} />
    <Route path="/dang-ky-khoa-hoc/create" element={<DangKyKhoaHocCreate />} />
  </>
);

export default DangKyKhoaHocRoutes;
