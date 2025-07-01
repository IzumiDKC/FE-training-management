// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Register from "./pages/account/RegisterPage";
import Login from "./pages/account/LoginPage";

import Navbar from "./layouts/Navbar";

import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/account/ProfilePage";

import KhoaHocRoutes from "./routes/KhoaHocRoutes";
import ChuongTrinhRoutes from "./routes/ChuongTrinhRoutes";
import LopRoutes from "./routes/LopRoutes"; 
import LoaiLopRoutes from "./routes/LoaiLopRoutes";
import ChiTietLopRoutes from "./routes/ChiTietLopRoutes";

import DiemDanhRoutes from "./routes/DiemDanhRoutes";
// import DiemDanhList from "./components/DiemDanhList";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
        
        </Routes>

        <KhoaHocRoutes />
        <ChuongTrinhRoutes />
        <LopRoutes />        
        <LoaiLopRoutes />
        <ChiTietLopRoutes />
        <DiemDanhRoutes />
        
      </Router>
    </AuthProvider>
  );
}

export default App;
