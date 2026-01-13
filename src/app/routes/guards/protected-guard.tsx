import { useSession } from '@/hooks/use-session';
import type { UserRole } from '@/types/auth';
import { Navigate, Outlet } from 'react-router-dom';

type AllowedRoles =
  | ['ADMIN']
  | ['USER']
  | ['ADMIN', 'USER']
  | ['USER', 'ADMIN'];

const ProtectedGuard = ({ allow }: { allow: AllowedRoles }) => {
  const { session } = useSession();

  if (!session) return <Navigate to="/auth/login" replace />;

  const userRole = session.user.role;
  const allowRoles: UserRole[] = allow;

  if (allow && !allowRoles.includes(userRole)) {
    return userRole === 'ADMIN' ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedGuard;
