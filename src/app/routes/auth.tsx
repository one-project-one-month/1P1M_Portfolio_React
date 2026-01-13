import { AuthLayout, OpmRegister, RegisterList } from '@/constants/lazyload';
import type { RouteObject } from 'react-router-dom';
import SignupPage from '../features/auth/signup/page';

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'sign-up', element: <SignupPage /> }],
  },
  {
    path: '/auth/opom-register',
    element: <OpmRegister />,
  },
  { path: '/register-list', element: <RegisterList /> },
];
