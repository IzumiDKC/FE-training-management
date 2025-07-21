import React, { useEffect, useState } from "react";
import { getThongKeTongQuan, getHocVienMoiTheoThang } from "../../services/thongKeApi";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import "./ThongKePage.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const ThongKePage = () => {
  const [overview, setOverview] = useState(null);
  const [monthly, setMonthly] = useState([]);
  // eslint-disable-next-line
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const [overviewRes, monthlyRes] = await Promise.all([
        getThongKeTongQuan(),
        getHocVienMoiTheoThang()
      ]);
      setOverview(overviewRes);
      setMonthly(monthlyRes);
    };
    fetch();
  }, []);

  if (!overview) return <p>🔄 Đang tải thống kê...</p>;

  return (
    <div className="thongke-container">
      <h2 className="thongke-title">📊 Tổng quan</h2>

      <div className="summary-cards centered">
        <div className="card">Tài khoản mới tuần: <strong>{overview.accountsCreatedThisWeek}</strong></div>
        <div className="card">Học viên: <strong>{overview.tongHocVien}</strong></div>
        <div className="card">Giảng viên: <strong>{overview.tongGiangVien}</strong></div>
        <div className="card">Lớp học: <strong>{overview.tongLop}</strong></div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Top 5 lớp có nhiều học viên</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overview.topLops}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tenLop" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="soLuongHocVien" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dual-charts">
        <div className="chart-box">
          <h3 className="chart-title">Số lượng Học viên mới</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="thang" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="soLuong" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3 className="chart-title">Số lượng học viên theo lớp</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={overview.topLops}
                dataKey="soLuongHocVien"
                nameKey="tenLop"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {overview.topLops.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {overview.lopDaiNhat && overview.lopNganNhat && (
        <div className="chart-section">
          <h3 className="chart-title">⏱ Lớp học dài/nhất ngắn nhất</h3>
          <div className="summary-cards centered">
            <div className="card">Lớp dài nhất: <strong>{overview.lopDaiNhat.tenLop}</strong> ({overview.lopDaiNhat.thoiGianNgay} ngày)</div>
            <div className="card">Lớp ngắn nhất: <strong>{overview.lopNganNhat.tenLop}</strong> ({overview.lopNganNhat.thoiGianNgay} ngày)</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThongKePage;
