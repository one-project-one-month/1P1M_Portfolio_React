import { useUserInfoStore } from '@/store/user-info-store';
import type { UserRole } from '@/types/auth';
import { Navigate, Outlet } from 'react-router-dom';

type AllowedRoles =
  | ['ADMIN']
  | ['USER']
  | ['ADMIN', 'USER']
  | ['USER', 'ADMIN'];

const ProtectedGuard = ({ allow }: { allow: AllowedRoles }) => {
  const user = useUserInfoStore().userInfo;

  if (!user) return <Navigate to="/auth/log-in" replace />;

  const userRole = user.role;
  const allowRoles: UserRole[] = allow;

  if (allow && !allowRoles.includes(userRole ?? '')) {
    return userRole === 'ADMIN' ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedGuard;
