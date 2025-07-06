// src/Routes/KhoaHocRoutes.js
import { Route } from "react-router";

import KhoaHocPage from "../pages/KhoaHoc/KhoaHocPage";
import KhoaHocCreate from "../pages/KhoaHoc/KhoaHocCreate";
import KhoaHocEdit from "../pages/KhoaHoc/KhoaHocEdit";
import KhoaHocDetail from "../pages/KhoaHoc/KhoaHocDetail";

const KhoaHocRoutes = () => (
  <>
    <Route path="/khoa-hoc" element={<KhoaHocPage />} />
    <Route path="/khoa-hoc/create" element={<KhoaHocCreate />} />
    <Route path="/khoa-hoc/edit/:id" element={<KhoaHocEdit />} />
    <Route path="/khoa-hoc/:id" element={<KhoaHocDetail />} />
  </>
);

export default KhoaHocRoutes;
