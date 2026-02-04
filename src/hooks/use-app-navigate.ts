import type { UserRole } from '@/types/nav-props';
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom';
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const goTo = (to: To, options?: NavigateOptions) => {
    navigate(to, options);
  };

  const handleHomeNav = (role?: UserRole | null) => {
    if (role === 'ADMIN') {
      goTo('/admin');
    } else {
      goTo('/');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleRoute = (role: 'ADMIN' | 'USER', isNewUser?: boolean) => {
    if (role === 'ADMIN') {
      goTo('/admin');
    } else if (!isNewUser && role === 'USER') {
      goTo('/');
    } else {
      goTo('/auth/setup-profile');
    }
  };

  return {
    goTo,
    goBack,
    handleHomeNav,
    handleRoute,
  };
};
