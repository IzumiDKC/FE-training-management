// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";

// Layout
import Main from "./layouts/Main";

// Pages
import Home from "./pages/Home";
import Register from "./pages/account/RegisterPage";
import Login from "./pages/account/LoginPage";
import ProfilePage from "./pages/account/ProfilePage";

// Route groups (trả về <Route> chứ KHÔNG phải <Routes>)
import KhoaHocRoutes from "./routes/KhoaHocRoutes";
import ChuongTrinhRoutes from "./routes/ChuongTrinhRoutes";
import LopRoutes from "./routes/LopRoutes";
import LoaiLopRoutes from "./routes/LoaiLopRoutes";
import ChiTietLopRoutes from "./routes/ChiTietLopRoutes";
import DiemDanhRoutes from "./routes/DiemDanhRoutes";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            {/* Các trang KHÔNG dùng layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Các trang dùng layout Main */}
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<ProfilePage />} />

              {/* Route group xài fragment */}
              {KhoaHocRoutes()}
              {ChuongTrinhRoutes()}
              {LopRoutes()}
              {LoaiLopRoutes()}
              {ChiTietLopRoutes()}
              {DiemDanhRoutes()}
            </Route>
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
