import { useNavigate, useParams } from "react-router";
import DiemDanhList from "../../components/DiemDanhList"; 

const DiemDanhPage = () => {
  const { chiTietLopId } = useParams(); 
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📋 Điểm danh lớp học</h3>
        <div>
          <button
            className="btn btn-light btn-sm me-2"
            onClick={() => navigate(`/lop/edit/${chiTietLopId}`)}
          >
            ✏️ Chỉnh sửa lớp
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/lop/${chiTietLopId}`)}
          >
            ⬅️ Quay lại
          </button>
        </div>
      </div>

      <DiemDanhList chiTietLopId={chiTietLopId} />
    </div>
  );
};

export default DiemDanhPage;
