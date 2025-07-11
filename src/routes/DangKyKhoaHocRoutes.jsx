// src/routes/DangKyKhoaHocRoutes.jsx
import { Route } from "react-router";
import DangKyKhoaHocPage from "../pages/DangKyKhoaHoc/DangKyKhoaHocPage";
import DangKyKhoaHocCreate from "../pages/DangKyKhoaHoc/DangKyKhoaHocCreate";

import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";

const DangKyKhoaHocRoutes = () => (
  <>
    <Route
      path="/dang-ky-khoa-hoc"
      element={
        <RoleRoute allowedRoles={["Admin"]}>
          <DangKyKhoaHocPage />
        </RoleRoute>
      }
    />

    <Route
      path="/dang-ky-khoa-hoc/create"
      element={
        <PrivateRoute>
          <DangKyKhoaHocCreate />
        </PrivateRoute>
      }
    />
  </>
);

export default DangKyKhoaHocRoutes;
