import { useAuth } from "../contexts/AuthContext";

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

const RoleRoute = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new HttpError(401, "Chưa đăng nhập");
  }

  const hasRole = currentUser.roles?.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    throw new HttpError(403, "Không có quyền truy cập");
  }

  return children;
};

export default RoleRoute;
