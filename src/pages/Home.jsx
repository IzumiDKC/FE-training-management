// File: src/pages/Home.jsx
import React from "react";
import Footer from "../layouts/Footer";
import "./Home.css";
import { FaChalkboardTeacher } from "react-icons/fa";

const features = [
	{
		img: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
		title: "Quản lý Học viên",
		desc: "Thông tin học viên, lịch học, điểm danh dễ dàng theo dõi và cập nhật.",
		alt: "Quản lý học viên",
	},
	{
		img: "https://cdn-icons-png.flaticon.com/512/1904/1904425.png",
		title: "Tổ chức Khóa học",
		desc: "Khởi tạo, phân lớp và theo dõi tiến độ khóa học hiệu quả.",
		alt: "Tổ chức khóa học",
	},
	{
		img: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
		title: "Báo cáo & Thống kê",
		desc: "Xuất báo cáo học tập, thống kê học viên, giảng viên và lớp học chi tiết.",
		alt: "Thống kê",
	},
];

const Home = () => {
	return (
		<>
			<div className="home-bg">
				<div className="container home-hero mt-5 position-relative">
					<div className="row align-items-center">
						<div className="col-md-6 animate-fadein">
							<h1 className="display-4 text-gradient">
								<FaChalkboardTeacher
									className="me-2"
									style={{ verticalAlign: "-0.2em" }}
								/>
								Hệ thống Quản lý Đào tạo
							</h1>
							<p className="lead mt-4 home-highlight">
								<span className="edu-icon" role="img" aria-label="book">
									📚
								</span>
								<span>
									<span className="highlight-text">
										Quản lý chương trình, khóa học, lớp học
									</span>{" "}
									và học viên một cách
									<span className="highlight-keyword"> hiệu quả </span>
									và
									<span className="highlight-keyword"> dễ dàng</span>.
								</span>
							</p>
							<p className="mt-3 home-highlight">
								<span className="edu-icon" role="img" aria-label="star">
									🌟
								</span>
								<span>
									Bạn có thể{" "}
									<span className="highlight-keyword">
										theo dõi quá trình học tập
									</span>
									,{" "}
									<span className="highlight-keyword">điểm danh</span>,{" "}
									<span className="highlight-keyword">đăng ký khóa học</span> và
									hơn thế nữa!
								</span>
							</p>
						</div>
						<div className="col-md-6 text-center animate-fadein-img">
							<img
								src="https://cdn.pixabay.com/photo/2014/05/10/19/23/presentation-341444_1280.png"
								className="img-fluid rounded shadow-lg home-main-img"
								alt="E-learning concept"
							/>
						</div>
					</div>

					<hr className="my-5" />

					<div className="row justify-content-center home-features">
						{features.map((f, idx) => (
							<div className="col-md-4 mb-4" key={idx}>
								<div className="feature-card-v2 shadow-sm animate-up">
									<div className="feature-icon-bg">
										<img
											src={f.img}
											width="64"
											alt={f.alt}
											className="feature-icon-img"
										/>
									</div>
									<h4 className="feature-title mt-3">{f.title}</h4>
									<p className="feature-desc">{f.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Icon trang trí hai bên */}
				<img
					src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
					className="bg-icon left"
					alt=""
				/>
				<img
					src="https://cdn-icons-png.flaticon.com/512/1904/1904425.png"
					className="bg-icon right"
					alt=""
				/>
			</div>
			<Footer />
		</>
	);
};

export default Home;
