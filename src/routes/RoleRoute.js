import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const RoleRoute = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/unauthorized");
    } else if (!currentUser.roles?.some(role => allowedRoles.includes(role))) {
      navigate("/forbidden");
    }
  }, [currentUser, navigate, allowedRoles]);

  const hasRole = currentUser?.roles?.some((role) => allowedRoles.includes(role));
  if (!currentUser || !hasRole) return null;

  return children;
};

export default RoleRoute;
