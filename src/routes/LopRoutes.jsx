import { Route } from "react-router";
import LopPage from "../pages/Lop/LopPage";
import LopCreate from "../pages/Lop/LopCreate";
import LopEdit from "../pages/Lop/LopEdit";
import LopDetail from "../pages/Lop/LopDetail";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const LopRoutes = () => (
  <>
    {/* ✅ Public route */}
    <Route path="/lop" element={<LopPage />} />

    {/* Admin, GiangVien */}
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
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <LopEdit />
        </RoleRoute>
      }
    />

    {/* Login */}
    <Route
      path="/lop/:id"
      element={
        <PrivateRoute>
          <LopDetail />
        </PrivateRoute>
      }
    />
  </>
);

export default LopRoutes;
