import React, { useEffect, useState } from "react";
import { getPagedUsers, changeUserRole } from "../../services/adminApi";
import { 
  Container, 
  Card, 
  Table, 
  Button, 
  Badge, 
  Spinner, 
  Pagination,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import { 
  FaUsers, 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaCrown,
  FaShieldAlt,
  FaUserTag,
  FaExchangeAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner
} from "react-icons/fa";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processingUserId, setProcessingUserId] = useState("");

  const loadUsers = async (currentPage) => {
    setLoading(true);
    try {
      const res = await getPagedUsers(currentPage);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Lỗi khi tải người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const handleChangeRole = async (userId) => {
    if (!window.confirm("Bạn có chắc muốn chuyển vai trò người dùng này?")) return;
    setProcessingUserId(userId);
    try {
      await changeUserRole(userId);
      await loadUsers(page); 
    } catch (err) {
      alert("Lỗi khi chuyển vai trò!");
      console.error(err);
    } finally {
      setProcessingUserId("");
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <FaCrown className="me-1" />;
      case "Manager":
        return <FaShieldAlt className="me-1" />;
      default:
        return <FaUserTag className="me-1" />;
    }
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case "Admin":
        return "danger";
      case "Manager":
        return "warning";
      default:
        return "success";
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-center mt-4">
        <Pagination className="userlist-pagination">
          <Pagination.Prev 
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            <FaChevronLeft />
          </Pagination.Prev>
          
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          
          <Pagination.Next 
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            <FaChevronRight />
          </Pagination.Next>
        </Pagination>
      </div>
    );
  };

  return (
    <div className="userlist-modern-wrapper">
      {/* Background Effects */}
      <div className="userlist-bg-effects">
        <div className="userlist-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`userlist-particle particle-${i + 1}`}></div>
          ))}
        </div>
        <div className="userlist-shapes">
          <div className="userlist-shape shape-circle"></div>
          <div className="userlist-shape shape-square"></div>
          <div className="userlist-shape shape-hexagon"></div>
        </div>
      </div>

      <Container className="userlist-container">
        {/* Header Section */}
        <Row className="justify-content-center mb-4">
          <Col lg={12}>
            <Card className="userlist-header-card border-0 shadow-lg">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <div className="userlist-icon-wrapper">
                      <FaUsers />
                    </div>
                  </Col>
                  <Col>
                    <div className="userlist-header-content">
                      <h2 className="userlist-title mb-2">
                        👥 Danh sách tài khoản
                      </h2>
                      <p className="userlist-subtitle mb-0">
                        Quản lý và phân quyền người dùng trong hệ thống
                      </p>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <Badge bg="primary" className="userlist-count-badge px-3 py-2">
                      <FaUser className="me-2" />
                      {users.length} người dùng
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="userlist-main-card border-0 shadow">
              <Card.Header className="bg-gradient-primary text-white border-0 p-4">
                <div className="d-flex align-items-center">
                  <FaUsers className="me-3" size={24} />
                  <h4 className="mb-0">Danh sách người dùng</h4>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                {loading ? (
                  <div className="userlist-loading-section text-center py-5">
                    <Spinner animation="border" variant="primary" size="lg" className="mb-3" />
                    <h5 className="text-primary">🔄 Đang tải người dùng...</h5>
                    <p className="text-muted mb-0">Vui lòng chờ trong giây lát</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="userlist-empty-section text-center py-5">
                    <div className="userlist-empty-icon mb-3">
                      <FaUsers />
                    </div>
                    <h5 className="text-muted">Không có người dùng nào</h5>
                    <p className="text-muted mb-0">Danh sách người dùng hiện tại trống</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table hover className="userlist-table mb-0">
                      <thead>
                        <tr>
                          <th className="userlist-th">#</th>
                          <th className="userlist-th">
                            <FaUser className="me-2" />
                            Họ tên
                          </th>
                          <th className="userlist-th">
                            <FaEnvelope className="me-2" />
                            Email
                          </th>
                          <th className="userlist-th">
                            <FaIdCard className="me-2" />
                            Số CCCD
                          </th>
                          <th className="userlist-th">Vai trò</th>
                          <th className="userlist-th text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user.userId} className="userlist-row">
                            <td className="userlist-td">
                              <div className="userlist-index">
                                {(page - 1) * 10 + index + 1}
                              </div>
                            </td>
                            <td className="userlist-td">
                              <div className="userlist-user-info">
                                <div className="userlist-user-avatar">
                                  <FaUser />
                                </div>
                                <div className="userlist-user-name">{user.hoTen}</div>
                              </div>
                            </td>
                            <td className="userlist-td">
                              <div className="userlist-email">{user.email}</div>
                            </td>
                            <td className="userlist-td">
                              {user.soCanCuoc ? (
                                <div className="userlist-cccd">{user.soCanCuoc}</div>
                              ) : (
                                <em className="text-muted">Chưa có</em>
                              )}
                            </td>
                            <td className="userlist-td">
                              <Badge 
                                bg={getRoleVariant(user.role)} 
                                className="userlist-role-badge"
                              >
                                {getRoleIcon(user.role)}
                                {user.role}
                              </Badge>
                            </td>
                            <td className="userlist-td text-center">
                              {user.role !== "Admin" ? (
                                <Button
                                  variant="warning"
                                  size="sm"
                                  className="userlist-action-btn"
                                  disabled={processingUserId === user.userId}
                                  onClick={() => handleChangeRole(user.userId)}
                                >
                                  {processingUserId === user.userId ? (
                                    <>
                                      <FaSpinner className="userlist-spin me-2" />
                                      Đang xử lý...
                                    </>
                                  ) : (
                                    <>
                                      <FaExchangeAlt className="me-2" />
                                      Chuyển vai trò
                                    </>
                                  )}
                                </Button>
                              ) : (
                                <span className="text-muted">--</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pagination */}
        {!loading && renderPagination()}
      </Container>
    </div>
  );
};

export default UserList;
