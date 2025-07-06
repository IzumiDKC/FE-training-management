// File: src/pages/Home.jsx
import React from "react";
import Footer from "../layouts/Footer";

const Home = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 text-primary">👨‍🏫 Hệ thống Quản lý Đào tạo</h1>
            <p className="lead mt-4">
              Quản lý chương trình, khóa học, lớp học và học viên một cách hiệu quả và dễ dàng.
            </p>
            <p className="mt-3">
              Bạn có thể theo dõi quá trình học tập, điểm danh, đăng ký khóa học và hơn thế nữa!
            </p>    
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.pixabay.com/photo/2014/05/10/19/23/presentation-341444_1280.png"
              className="img-fluid rounded shadow"
              alt="E-learning concept"
            />
          </div>
        </div>

        <hr className="my-5" />

        <div className="row text-center">
          <div className="col-md-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              width="80"
              alt="Quản lý học viên"
            />
            <h4 className="mt-3">Quản lý Học viên</h4>
            <p>Thông tin học viên, lịch học, điểm danh dễ dàng theo dõi và cập nhật.</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1904/1904425.png"
              width="80"
              alt="Tổ chức khóa học"
            />
            <h4 className="mt-3">Tổ chức Khóa học</h4>
            <p>Khởi tạo, phân lớp và theo dõi tiến độ khóa học hiệu quả.</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
              width="80"
              alt="Thống kê"
            />
            <h4 className="mt-3">Báo cáo & Thống kê</h4>
            <p>Xuất báo cáo học tập, thống kê học viên, giảng viên và lớp học chi tiết.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
