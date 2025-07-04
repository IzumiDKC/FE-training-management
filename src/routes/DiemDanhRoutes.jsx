// File: src/routes/DiemDanhRoutes.jsx
import { Routes, Route } from "react-router";
import QRScanPage from "../pages/DiemDanh/QRScanPage";
import DiemDanhPage from "../pages/DiemDanh/DiemDanhPage";

const DiemDanhRoutes = () => (
  <Routes>   
    <Route path="/diem-danh/:lopId/:chiTietLopId" element={<DiemDanhPage />} />
    <Route path="/qr-scan/:token" element={<QRScanPage />} />
    
  </Routes>
);
export default DiemDanhRoutes;