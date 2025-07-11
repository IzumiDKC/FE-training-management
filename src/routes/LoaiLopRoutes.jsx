// File: src/routes/LoaiLopRoutes.jsx
import React from "react";
import { Route } from "react-router";

import LoaiLopPage from "../pages/LoaiLop/LoaiLopPage";
import LoaiLopCreate from "../pages/LoaiLop/LoaiLopCreate";
import LoaiLopEdit from "../pages/LoaiLop/LoaiLopEdit";
import LoaiLopDetail from "../pages/LoaiLop/LoaiLopDetail";

import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";

const LoaiLopRoutes = () => (
  <>
    <Route
      path="loai-lop"
      element={
        <PrivateRoute>
          <LoaiLopPage />
        </PrivateRoute>
      }
    />

    <Route
      path="loai-lop/:id"
      element={
        <PrivateRoute>
          <LoaiLopDetail />
        </PrivateRoute>
      }
    />

    <Route
      path="loai-lop/create"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <LoaiLopCreate />
        </RoleRoute>
      }
    />

    <Route
      path="loai-lop/e/:id"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <LoaiLopEdit />
        </RoleRoute>
      }
    />


  </>
);

export default LoaiLopRoutes;
