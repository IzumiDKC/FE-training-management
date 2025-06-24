// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Register from "./pages/account/RegisterPage";
import Login from "./pages/account/LoginPage";

import Navbar from "./layouts/Navbar";

import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/account/ProfilePage";

import KhoaHocPage from "./pages/KhoaHoc/KhoaHocPage";
import KhoaHocCreate from "./pages/KhoaHoc/KhoaHocCreate";
import KhoaHocEdit from "./pages/KhoaHoc/KhoaHocEdit";
import KhoaHocDetail from "./pages/KhoaHoc/KhoaHocDetail";

import ChuongTrinhPage from "./pages/ChuongTrinh/ChuongTrinhPage";
import ChuongTrinhCreate from "./pages/ChuongTrinh/ChuongTrinhCreate";
import ChuongTrinhEdit from "./pages/ChuongTrinh/ChuongTrinhEdit";
import ChuongTrinhDetail from "./pages/ChuongTrinh/ChuongTrinhDetail";

import LopPage from "./pages/Lop/LopPage";
import LopCreate from "./pages/Lop/LopCreate";  
import LopEdit from "./pages/Lop/LopEdit";
import LopDetail from "./pages/Lop/LopDetail";

import LoaiLopPage from "./pages/LoaiLop/LoaiLopPage";
import LoaiLopCreate from "./pages/LoaiLop/LoaiLopCreate";
import LoaiLopEdit from "./pages/LoaiLop/LoaiLopEdit";
import LoaiLopDetail from "./pages/LoaiLop/LoaiLopDetail";
import ChonHocVien from "./pages/Lop/ChonHocVien";

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

          <Route path="/khoa-hoc" element={<KhoaHocPage />} />
          <Route path="/khoa-hoc/create" element={<KhoaHocCreate />} />
          <Route path="/khoa-hoc/edit/:id" element={<KhoaHocEdit />} />
          <Route path="/khoa-hoc/:id" element={<KhoaHocDetail />} />

          <Route path ="/chuong-trinh" element={<ChuongTrinhPage />} />
          <Route path="/chuong-trinh/create" element={<ChuongTrinhCreate />} />
          <Route path="/chuong-trinh/edit/:id" element={<ChuongTrinhEdit />} />
          <Route path="/chuong-trinh/:id" element={<ChuongTrinhDetail />} />
        
          <Route path="/lop" element={<LopPage />} />
          <Route path="/lop/create" element={<LopCreate />} />
          <Route path="/lop/edit/:id" element={<LopEdit />} />
          <Route path="/lop/:id" element={<LopDetail />} />

          <Route path="/loai-lop" element={<LoaiLopPage />} />
          <Route path="/loai-lop/create" element={<LoaiLopCreate />} />
          <Route path="/loai-lop/e/:id" element={<LoaiLopEdit />} />
          <Route path="/loai-lop/:id" element={<LoaiLopDetail />} />
          <Route path="/lop/chon-hoc-vien/:id" element={<ChonHocVien />} />


          {/* Add more routes as needed */}

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
