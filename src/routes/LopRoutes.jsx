// File: src/routes/LopRoutes.jsx
import { Route } from "react-router";

import LopPage from "../pages/Lop/LopPage";
import LopCreate from "../pages/Lop/LopCreate";
import LopEdit from "../pages/Lop/LopEdit";
import LopDetail from "../pages/Lop/LopDetail";

const LopRoutes = () => (
  <>
    <Route path="lop" element={<LopPage />} />
    <Route path="lop/create" element={<LopCreate />} />
    <Route path="lop/edit/:id" element={<LopEdit />} />
    <Route path="lop/:id" element={<LopDetail />} />
  </>
);

export default LopRoutes;
