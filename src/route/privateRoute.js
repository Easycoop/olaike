import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ allowedRoles }) {
  return allowedRoles.includes("admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
}

export default PrivateRoute;
