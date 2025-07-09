// File: src/routes/ChuongTrinhRoutes.jsx
import { Route } from "react-router";

import ChuongTrinhPage from "../pages/ChuongTrinh/ChuongTrinhPage";
import ChuongTrinhCreate from "../pages/ChuongTrinh/ChuongTrinhCreate";
import ChuongTrinhEdit from "../pages/ChuongTrinh/ChuongTrinhEdit";
import ChuongTrinhDetail from "../pages/ChuongTrinh/ChuongTrinhDetail";

import RoleRoute from "./RoleRoute";  
import PrivateRoute from "./PrivateRoute"; 

const ChuongTrinhRoutes = () => (
  <>
    {/* @Everyone */}
    <Route path="/chuong-trinh" element={<ChuongTrinhPage />} />

    <Route
      path="/chuong-trinh/create"
      element={
        <RoleRoute allowedRoles={["Admin"]}>
          <ChuongTrinhCreate />
        </RoleRoute>
      }
    />

    {/* Admin */}
    <Route
      path="/chuong-trinh/edit/:id"
      element={
        <RoleRoute allowedRoles={["Admin"]}>
          <ChuongTrinhEdit />
        </RoleRoute>
      }
    />
    <Route
      path="/chuong-trinh/delete/:id"
      element={
        <RoleRoute allowedRoles={["Admin"]}>
          <ChuongTrinhEdit />
        </RoleRoute>
      }
    />

    {/* Login */}
    <Route
      path="/chuong-trinh/:id"
      element={
        <PrivateRoute>
          <ChuongTrinhDetail />
        </PrivateRoute>
      }
    />
  </>
);

export default ChuongTrinhRoutes;
