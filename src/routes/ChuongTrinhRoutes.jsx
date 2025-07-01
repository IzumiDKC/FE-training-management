// File: src/routes/KhoaHocRoutes.jsx
import { Routes, Route } from "react-router";

import ChuongTrinhPage from "../pages/ChuongTrinh/ChuongTrinhPage";
import ChuongTrinhCreate from "../pages/ChuongTrinh/ChuongTrinhCreate";
import ChuongTrinhEdit from "../pages/ChuongTrinh/ChuongTrinhEdit";
import ChuongTrinhDetail from "../pages/ChuongTrinh/ChuongTrinhDetail";

const ChuongTrinhRoutes = () => (
  <Routes>
    <Route path="/chuong-trinh" element={<ChuongTrinhPage />} />
    <Route path="/chuong-trinh/create" element={<ChuongTrinhCreate />} />
    <Route path="/chuong-trinh/edit/:id" element={<ChuongTrinhEdit />} />
    <Route path="/chuong-trinh/:id" element={<ChuongTrinhDetail />} />
  </Routes>
);

export default ChuongTrinhRoutes;
