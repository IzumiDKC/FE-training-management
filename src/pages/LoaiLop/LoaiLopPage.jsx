import React from "react";
import LoaiLopList from "../../components/LoaiLopList";
import "./LoaiLopPage.css";

const LoaiLopPage = () => {
  return (
    <div className="loai-lop-page-container">
      {/* Background Effects */}
      <div className="page-background">
        <div className="page-particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`page-dot dot-${(i % 3) + 1}`}></div>
          ))}
        </div>
        <div className="page-shapes">
          <div className="page-shape shape-hexagon"></div>
          <div className="page-shape shape-diamond"></div>
          <div className="page-shape shape-star"></div>
          <div className="page-shape shape-circle-outline"></div>
        </div>
        <div className="page-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        <LoaiLopList />
      </div>
    </div>
  );
};

export default LoaiLopPage;