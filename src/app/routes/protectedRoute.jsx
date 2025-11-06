import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token, role, allow }) => {
  const userRole = role?.name; 

  if (!token) return <Navigate to="/auth/login" replace />;


  if (allow && !allow.includes(userRole)) {
    return userRole === "ADMIN"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
