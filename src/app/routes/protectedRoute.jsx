import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token, role, allow }) => {
  const userRole = role?.name;
  console.log(role);
   

  if (!token) return <Navigate to="/auth/login" replace />;
console.log(userRole);


  if (allow && !allow.includes(role)) {
    return userRole === "ADMIN"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
