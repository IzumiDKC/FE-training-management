import { Route } from "react-router";
import UserList from "../pages/Admin/UserList";
import RoleRoute from "./RoleRoute";

const AdminRoutes = () => (
  <>
    <Route
      path="/admin/user-list"
      element={
        <RoleRoute allowedRoles={["Admin"]}>
          <UserList />
        </RoleRoute>
      }
    />
  </>
);

export default AdminRoutes;
