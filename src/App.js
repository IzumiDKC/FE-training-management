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
          <Route path="/khoa-hoc/detail/:id" element={<KhoaHocDetail />} />

          <Route path ="/chuong-trinh" element={<ChuongTrinhPage />} />
          <Route path="/chuong-trinh/create" element={<ChuongTrinhCreate />} />
          <Route path="/chuong-trinh/edit/:id" element={<ChuongTrinhEdit />} />
          <Route path="/chuong-trinh/detail/:id" element={<ChuongTrinhDetail />} />
        
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
