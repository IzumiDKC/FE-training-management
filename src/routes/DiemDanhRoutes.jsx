import { Routes, Route } from "react-router";

import DiemDanhPage from "../pages/DiemDanh/DiemDanhPage";
// import DiemDanhCreate from "../pages/DiemDanh/DiemDanhCreate";
// import DiemDanhEdit from "../pages/DiemDanh/DiemDanhEdit";
import DiemDanhDetail from "../pages/DiemDanh/DiemDanhDetail";

const DiemDanhRoutes = () => (
  <Routes>
    <Route path="/diem-danh/:chiTietLopId" element={<DiemDanhPage />} />
    {/* <Route path="/diem-danh/create/:chiTietLopId" element={<DiemDanhCreate />} /> */}
    {/* <Route path="/diem-danh/edit/:id" element={<DiemDanhEdit />} /> */}
    <Route path="/diem-danh/detail/:id" element={<DiemDanhDetail />} />
  </Routes>
);
export default DiemDanhRoutes;