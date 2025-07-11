// File: src/routes/LopRoutes.js
import { Route } from "react-router";
import LopPage from "../pages/Lop/LopPage";
import LopCreate from "../pages/Lop/LopCreate";
import LopEdit from "../pages/Lop/LopEdit";
import LopDetail from "../pages/Lop/LopDetail";
import ChonHocVien from "../pages/Lop/ChonHocVien";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const LopRoutes = () => (
  <>
    <Route
      path="/lop"
      element={
        <PrivateRoute>
          <LopPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/lop/:id"
      element={
        <PrivateRoute>
          <LopDetail />
        </PrivateRoute>
      }
    />

    <Route
      path="/lop/create"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <LopCreate />
        </RoleRoute>
      }
    />
    <Route
      path="/lop/edit/:id"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <LopEdit />
        </RoleRoute>
      }
    />

    <Route
      path="/lop/delete/:id"
      element={
        <RoleRoute allowedRoles={["Admin"]}>
          <LopEdit />
        </RoleRoute>
      }
    />
    <Route
      path="/lop/chon-hoc-vien/:id"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <ChonHocVien />
        </RoleRoute>
      }
    >

</Route>
  </>
);

export default LopRoutes;
