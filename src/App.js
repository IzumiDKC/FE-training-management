// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";

import Main from "./layouts/Main";

import Home from "./pages/Home";
import Register from "./pages/account/RegisterPage";
import Login from "./pages/account/LoginPage";
import ProfilePage from "./pages/account/ProfilePage";

import KhoaHocRoutes from "./routes/KhoaHocRoutes";
import ChuongTrinhRoutes from "./routes/ChuongTrinhRoutes";
import LopRoutes from "./routes/LopRoutes";
import LoaiLopRoutes from "./routes/LoaiLopRoutes";
import ChiTietLopRoutes from "./routes/ChiTietLopRoutes";
import DiemDanhRoutes from "./routes/DiemDanhRoutes";

import ResetPasswordPage from "./pages/account/ResetPasswordPage";
import ForgotPasswordPage from "./pages/account/manage/ForgotPasswordPage";
import ConfirmEmailPage from "./pages/account/manage/ConfirmEmailPage";
import ResendEmailPage from "./pages/account/manage/ResendEmailPage";

import ErrorRoutes from "./routes/ErrorRoutes";

import ErrorBoundary from "./components/ErrorBoundary";

import AdminRoutes from "./routes/AdminRoutes";
import DangKyKhoaHocRoutes from "./routes/DangKyKhoaHocRoutes";
import { setNavigate } from "./utils/navigateService";
import DanhGiaRoutes from "./routes/DanhGiaRoutes";
import ThongKeRoutes from "./routes/ThongKeRoutes";

const AppWithNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    sessionStorage.setItem("token", token);
  }
}, []);

  return (
    <ErrorBoundary>
      <Routes>
        {/* KHÔNG dùng layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/resend-confirmation" element={<ResendEmailPage />} />

        {ErrorRoutes()}

        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfilePage />} />

          {KhoaHocRoutes()}
          {ChuongTrinhRoutes()}
          {LopRoutes()}
          {LoaiLopRoutes()}
          {ChiTietLopRoutes()}
          {DiemDanhRoutes()}
          {AdminRoutes()}
          {DangKyKhoaHocRoutes()}
          {DanhGiaRoutes()}
          {ThongKeRoutes()}
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

const App = () => (
  <AuthProvider>
    <SidebarProvider>
      <Router>
        <AppWithNavigation />
      </Router>
    </SidebarProvider>
  </AuthProvider>
);

export default App;
