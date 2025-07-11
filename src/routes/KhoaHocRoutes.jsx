// src/Routes/KhoaHocRoutes.js
import { Route } from "react-router";

import KhoaHocPage from "../pages/KhoaHoc/KhoaHocPage";
import KhoaHocCreate from "../pages/KhoaHoc/KhoaHocCreate";
import KhoaHocEdit from "../pages/KhoaHoc/KhoaHocEdit";
import KhoaHocDetail from "../pages/KhoaHoc/KhoaHocDetail";

import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";

const KhoaHocRoutes = () => (
  <>
    <Route path="/khoa-hoc" element={<KhoaHocPage />} />

    <Route
      path="/khoa-hoc/:id"
      element={
        <PrivateRoute>
          <KhoaHocDetail />
        </PrivateRoute>
      }
    />
    
    <Route
      path="/khoa-hoc/create"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <KhoaHocCreate />
        </RoleRoute>
      }
    />
    <Route
      path="/khoa-hoc/edit/:id"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <KhoaHocEdit />
        </RoleRoute>
      }
    />

  </>
);

export default KhoaHocRoutes;

