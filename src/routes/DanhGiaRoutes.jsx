import { Route } from "react-router";
import DanhGiaPage from "../pages/DanhGia/DanhGiaPage";
import DanhGiaTheoNamPage from "../pages/DanhGia/DanhGiaTheoNamPage";
import DanhGiaCreatePage from "../pages/DanhGia/DanhGiaCreatePage";

const DanhGiaRoutes = () => (
  <>
    <Route path="/danh-gia" element={<DanhGiaPage />} />
    <Route path="/danh-gia/create/:hocVienId/:lopId" element={<DanhGiaCreatePage />} />
    <Route path="/danh-gia-theo-nam" element={<DanhGiaTheoNamPage />} />
  </>
);

export default DanhGiaRoutes;
