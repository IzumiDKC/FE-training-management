// File: src/pages/Home.jsx
import React from "react";
import Footer from "../layouts/Footer";
import "./css/Home.css";
import { FaChalkboardTeacher, FaUserGraduate, FaBookOpen, FaChartBar, FaLaptopCode } from "react-icons/fa";

const features = [
	{
		icon: <FaUserGraduate size={38} color="#3b82f6" />,
		title: "Quản lý học viên",
		desc: "Theo dõi tiến độ học tập, điểm danh và hỗ trợ học viên hiệu quả.",
		bg: "#e0f2fe",
		img: "https://cdn-icons-png.flaticon.com/512/201/201643.png",
		alt: "Student management"
	},
	{
		icon: <FaBookOpen size={38} color="#06b6d4" />,
		title: "Tổ chức khóa học",
		desc: "Khởi tạo, phân lớp, quản lý lịch học, tài liệu và đánh giá kết quả học tập.",
		bg: "#fef9c3",
		img: "https://cdn-icons-png.flaticon.com/512/201/201549.png",
		alt: "Course management"
	},
	{
		icon: <FaChartBar size={38} color="#f59e42" />,
		title: "Báo cáo & Thống kê",
		desc: "Xuất báo cáo học tập, thống kê học viên, giảng viên, lớp học trực quan.",
		bg: "#fce7f3",
		img: "https://cdn-icons-png.flaticon.com/512/201/201533.png",
		alt: "Reports and analytics"
	},
	{
		icon: <FaLaptopCode size={38} color="#10b981" />,
		title: "Học tập trực tuyến",
		desc: "Tích hợp công nghệ hiện đại, hỗ trợ học tập mọi lúc, mọi nơi.",
		bg: "#e0e7ff",
		img: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
		alt: "Online learning"
	},
];

const Home = () => (
	<>
		<div className="home-bg-simple">
			{/* Background Icons */}
			<img
				src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
				className="bg-icon left"
				alt="Education icon"
			/>
			<img
				src="https://cdn-icons-png.flaticon.com/512/1904/1904425.png"
				className="bg-icon right"
				alt="Learning icon"
			/>

			<div className="container home-hero-simple">
				<div className="row align-items-center">
					<div className="col-lg-6 col-12">
						<h1 className="fw-bold mb-3" style={{ color: "#22223b", fontSize: "2.2rem" }}>
							<FaChalkboardTeacher className="me-2" style={{ color: "#3b82f6" }} />
							Hệ thống Quản lý Đào tạo
						</h1>
						<p className="lead home-lead-simple mb-4">
							Nền tảng giáo dục số giúp quản lý chương trình, khóa học, lớp học và học viên một cách chuyên nghiệp và hiện đại.
						</p>
						<div className="mb-4">
							<a href="/register" className="btn btn-edu-outline">Đăng ký học viên</a>
						</div>
						<div className="home-quote-simple">
							<span className="quote-icon-simple">"</span>
							<span className="quote-text-simple">
								Giáo dục là chìa khóa mở ra cánh cửa tương lai.
							</span>
							<span className="quote-author-simple">- Nelson Mandela</span>
						</div>
					</div>
					<div className="col-md-6 text-center animate-fadein-img">
						<img
							src="https://cdn.pixabay.com/photo/2014/05/10/19/23/presentation-341444_1280.png"
							className="img-fluid rounded shadow-lg home-main-img"
							alt="E-learning concept"
						/>
					</div>
				</div>
			</div>

			<div className="container home-features-simple" id="features">
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
		</div>
		<Footer />
	</>
);

export default Home;