// File: src/routes/LopRoutes.js
import { Route } from "react-router";
import RoleRoute from "./RoleRoute";
import ThongKeDashboardPage from "../pages/ThongKe/ThongKePage";
const ThongKeRoutes = () => (
    <>
        <Route
            path="/thong-ke"
            element={
                <RoleRoute allowedRoles={["Admin"]}>
                    <ThongKeDashboardPage />
                </RoleRoute>
            }
        />
    </>
);

export default ThongKeRoutes;
