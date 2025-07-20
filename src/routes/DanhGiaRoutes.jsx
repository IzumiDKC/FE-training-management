// src/routes/DanhGiaRoutes.jsx
import { Route } from "react-router";

import DanhGiaPage from "../pages/DanhGia/DanhGiaPage";
import DanhGiaCreatePage from "../pages/DanhGia/DanhGiaCreatePage";
import DanhGiaChiTietTheoNamPage from "../pages/DanhGia/DanhGiaChiTietTheoNamPage";
import RoleRoute from "./RoleRoute";

const DanhGiaRoutes = () => (
  <>
    <Route
      path="/danh-gia"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <DanhGiaPage />
        </RoleRoute>
      }
    />
    <Route
      path="/danh-gia/create/:hocVienId/:lopId"
      element={
        <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
          <DanhGiaCreatePage />
        </RoleRoute>
      }
    />
    
<Route
  path="/danh-gia-tong-hop-theo-nam"
  element={
    <RoleRoute allowedRoles={["Admin", "GiangVien"]}>
      <DanhGiaChiTietTheoNamPage />
    </RoleRoute>
  }
/>
    
  </>
);

export default DanhGiaRoutes;
