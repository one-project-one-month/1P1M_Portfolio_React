import { authUtils } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allow }) => {
  const token = authUtils.getToken();
  const role = authUtils.getRole();

  if (!token) return <Navigate to="/auth/login" replace />;

  if (allow && !allow.includes(role)) {
    return userRole === "ADMIN" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
