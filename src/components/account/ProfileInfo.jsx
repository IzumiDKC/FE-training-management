import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/accountApi";
import { checkTokenValidity } from "../../services/accountApi";
import { 
  Container, 
  Card, 
  Row, 
  Col, 
  Alert, 
  Spinner, 
  Badge
} from "react-bootstrap";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaUserTag, 
  FaCrown,
  FaShieldAlt,
  FaUserCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import "../../pages/css/account/ProfileInfo.css";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");
        setTokenError("");
        
        // Check token validity first
        await checkTokenValidity();
        
        // If token is valid, fetch user data
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (tokenErr) {
        // Check if it's a token error
        if (tokenErr.message?.includes("token") || tokenErr.status === 401) {
          setTokenError("Token không hợp lệ. Bạn cần đăng nhập lại.");
        } else {
          setError("Không thể tải thông tin. Có thể bạn chưa đăng nhập.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getRoleIcon = (roles) => {
    if (!Array.isArray(roles)) return <FaUser />;
    if (roles.includes("Admin")) return <FaCrown />;
    if (roles.includes("Manager")) return <FaShieldAlt />;
    return <FaUserTag />;
  };

  const getRoleVariant = (roles) => {
    if (!Array.isArray(roles)) return "secondary";
    if (roles.includes("Admin")) return "danger";
    if (roles.includes("Manager")) return "warning";
    return "success";
  };

  if (loading) {
    return (
      <div className="profile-modern-wrapper">
        <Container className="profile-container">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Card className="profile-loading-card text-center p-5 border-0 shadow">
                <Card.Body>
                  <div className="mb-3">
                    <Spinner animation="border" variant="primary" size="lg" />
                  </div>
                  <h4 className="text-primary">🔄 Đang tải...</h4>
                  <p className="text-muted mb-0">Vui lòng chờ trong giây lát</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="profile-modern-wrapper">
        <Container className="profile-container">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Alert variant="danger" className="profile-alert text-center p-4">
                <div className="mb-3">
                  <FaExclamationTriangle size={48} className="text-danger" />
                </div>
                <h4>Token không hợp lệ</h4>
                <p className="mb-0">{tokenError}</p>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-modern-wrapper">
        <Container className="profile-container">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Alert variant="danger" className="profile-alert text-center p-4">
                <div className="mb-3">
                  <FaExclamationTriangle size={48} className="text-danger" />
                </div>
                <h4>Lỗi tải thông tin</h4>
                <p className="mb-0">{error}</p>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-modern-wrapper">
        <Container className="profile-container">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Alert variant="warning" className="profile-alert text-center p-4">
                <div className="mb-3">
                  <FaExclamationTriangle size={48} className="text-warning" />
                </div>
                <h4>Không có dữ liệu</h4>
                <p className="mb-0">Không tìm thấy thông tin người dùng</p>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="profile-modern-wrapper">
      <Container className="profile-container">
        {/* Header Card */}
        <Row className="justify-content-center mb-4">
          <Col lg={10}>
            <Card className="profile-header-card border-0 shadow-lg">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <div className="profile-avatar-wrapper">
                      <div className="profile-avatar">
                        <FaUserCircle />
                      </div>
                      <div className="profile-avatar-ring"></div>
                    </div>
                  </Col>
                  <Col>
                    <div className="profile-header-content">
                      <h2 className="profile-title mb-2">
                        👤 Thông tin cá nhân
                      </h2>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <Badge 
                      bg={getRoleVariant(user.roles)} 
                      className="profile-role-badge px-3 py-2"
                    >
                      {getRoleIcon(user.roles)}
                      <span className="ms-2">
                        {Array.isArray(user.roles) && user.roles.length > 0 
                          ? user.roles[0] 
                          : "User"}
                      </span>
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="profile-main-card border-0 shadow">
              <Card.Header className="bg-gradient-primary text-white border-0 p-4">
                <div className="d-flex align-items-center">
                  <FaUser className="me-3" size={24} />
                  <h4 className="mb-0">Thông tin chi tiết</h4>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-4">
                  <Col md={6}>
                    <div className="profile-info-item">
                      <div className="profile-info-icon name-icon">
                        <FaUser />
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Họ và tên</div>
                        <div className="profile-info-value">{user.hoTen || "Chưa cập nhật"}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="profile-info-item">
                      <div className="profile-info-icon email-icon">
                        <FaEnvelope />
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Email</div>
                        <div className="profile-info-value">{user.email || "Chưa cập nhật"}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="profile-info-item">
                      <div className="profile-info-icon id-icon">
                        <FaIdCard />
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Số căn cước</div>
                        <div className="profile-info-value">{user.soCanCuoc || "Chưa cập nhật"}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="profile-info-item">
                      <div className={`profile-info-icon role-icon ${getRoleVariant(user.roles)}`}>
                        {getRoleIcon(user.roles)}
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Vai trò</div>
                        <div className="profile-info-value">
                          {Array.isArray(user.roles) ? user.roles.join(", ") : "Chưa có"}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="justify-content-center mt-4">
          <Col lg={10}>
            <Row className="g-3">
              <Col lg={4} md={6}>
                <Card className="profile-stat-card border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="profile-stat-icon-wrapper mb-3">
                      <FaUser className="profile-stat-icon" />
                    </div>
                    <h5 className="profile-stat-number">1</h5>
                    <p className="profile-stat-label mb-0">Tài khoản</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card className="profile-stat-card border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="profile-stat-icon-wrapper mb-3">
                      <FaShieldAlt className="profile-stat-icon" />
                    </div>
                    <h5 className="profile-stat-number">
                      {Array.isArray(user.roles) ? user.roles.length : 0}
                    </h5>
                    <p className="profile-stat-label mb-0">Vai trò</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card className="profile-stat-card border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="profile-stat-icon-wrapper mb-3">
                      <FaUserCircle className="profile-stat-icon" />
                    </div>
                    <h5 className="profile-stat-number">100%</h5>
                    <p className="profile-stat-label mb-0">Hoàn thiện</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileInfo;
