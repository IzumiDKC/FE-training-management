import { Route } from "react-router";

import ChiTietLopPage from "../pages/ChiTietLop/ChiTietLopPage";
import ChiTietLopCreate from "../pages/ChiTietLop/ChiTietLopCreate";
import ChiTietLopEdit from "../pages/ChiTietLop/ChiTietLopEdit";
import ChiTietLopDetail from "../pages/ChiTietLop/ChiTietLopDetail";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const ChiTietLopRoutes = () => (
  <>
    <Route
      path="/chi-tiet-lop/:lopId"
      element={
        <PrivateRoute>
          <ChiTietLopPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/chi-tiet-lop/detail/:id"
      element={
        <PrivateRoute>
          <ChiTietLopDetail />
        </PrivateRoute>
      }
    />

    <Route
      path="/chi-tiet-lop/create/:lopId"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <ChiTietLopCreate />
        </RoleRoute>
      }
    />
    <Route
      path="/chi-tiet-lop/edit/:id"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <ChiTietLopEdit />
        </RoleRoute>
      }
    />
  </>
);

export default ChiTietLopRoutes;
