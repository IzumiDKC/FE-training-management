import { Route } from "react-router";

import ChiTietLopPage from "../pages/ChiTietLop/ChiTietLopPage";
import ChiTietLopCreate from "../pages/ChiTietLop/ChiTietLopCreate";
import ChiTietLopEdit from "../pages/ChiTietLop/ChiTietLopEdit";
import ChiTietLopDetail from "../pages/ChiTietLop/ChiTietLopDetail";

const ChiTietLopRoutes = () => (
  <>
    <Route path="/chi-tiet-lop/:lopId" element={<ChiTietLopPage />} />
    <Route path="/chi-tiet-lop/create/:lopId" element={<ChiTietLopCreate />} />
    <Route path="/chi-tiet-lop/edit/:id" element={<ChiTietLopEdit />} />
    <Route path="/chi-tiet-lop/detail/:id" element={<ChiTietLopDetail />} />
  </>
);
export default ChiTietLopRoutes;