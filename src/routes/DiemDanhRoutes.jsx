// File: src/routes/DiemDanhRoutes.jsx
import { Route } from "react-router";
import QRScanPage from "../pages/DiemDanh/QRScanPage";
import DiemDanhPage from "../pages/DiemDanh/DiemDanhPage";

import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";

const DiemDanhRoutes = () => (
  <>
    <Route
      path="/diem-danh/:lopId/:chiTietLopId"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <DiemDanhPage />
        </RoleRoute>
      }
    />
    <Route
      path="/qr-scan/:token"
      element={
        <PrivateRoute>
          <QRScanPage />
        </PrivateRoute>
      }
    />
  </>
);

export default DiemDanhRoutes;
