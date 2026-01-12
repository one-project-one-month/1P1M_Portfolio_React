import { AuthLayout } from '@/constants/lazyload';
import type { RouteObject } from 'react-router-dom';
import LoginPage from '../features/auth/login/page';
import RegisterPage from '../features/auth/register/page';
import SignupPage from '../features/auth/signup/page';

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'sign-up', element: <SignupPage /> },
      { path: 'log-in', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
];
