import React, { useEffect, useState } from "react";
import { getChiTietLopsByLopId, deleteChiTietLop } from "../services/chiTietLopApi";
import { useNavigate, useParams } from "react-router";

const ChiTietLopList = () => {
  const [buoiHocList, setBuoiHocList] = useState([]);
  const { lopId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChiTietLopsByLopId(lopId); 
        setBuoiHocList(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    if (lopId) fetchData();
  }, [lopId]); 

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa buổi học này?")) {
      await deleteChiTietLop(id);
      setBuoiHocList((prev) => prev.filter((item) => item.chiTietLopId !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h3>
        📚 Danh sách buổi học cho lớp #{lopId}
        {buoiHocList[0]?.tenLop ? ` - ${buoiHocList[0].tenLop}` : ""}
      </h3>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate(`/chi-tiet-lop/create/${lopId}`)} 
      >
        ➕ Thêm buổi học
      </button>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Ngày học</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Giảng viên</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {buoiHocList.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Không có buổi học nào.
              </td>
            </tr>
          ) : (
            buoiHocList.map((item) => (
              <tr key={item.chiTietLopId}>
                <td>{new Date(item.ngayHoc).toLocaleDateString()}</td>
                <td>{item.thoiGianBatDau?.substring(0, 5)}</td>
                <td>{item.thoiGianKetThuc?.substring(0, 5)}</td>
                <td>{item.tenGiangVien || "Chưa phân công"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => navigate(`/chi-tiet-lop/detail/${item.chiTietLopId}`)}
                  >
                    🔍 Xem
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/chi-tiet-lop/edit/${item.chiTietLopId}`)}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.chiTietLopId)} 
                  >
                    🗑️ Xóa
                  </button>

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => navigate(`/diem-danh/${lopId}/${item.chiTietLopId}`)}
                  >
                    📋 Điểm danh
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChiTietLopList;
