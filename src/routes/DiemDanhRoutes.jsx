// File: src/routes/DiemDanhRoutes.jsx
import { Route } from "react-router";
import QRScanPage from "../pages/DiemDanh/QRScanPage";
import DiemDanhPage from "../pages/DiemDanh/DiemDanhPage";

const DiemDanhRoutes = () => (
  <>   
    <Route path="/diem-danh/:lopId/:chiTietLopId" element={<DiemDanhPage />} />
    <Route path="/qr-scan/:token" element={<QRScanPage />} />  
  </>
);
export default DiemDanhRoutes;