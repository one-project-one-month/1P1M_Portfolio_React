import {
  AuthLayout,
  LoginPage,
  ProfileSetupPage,
  RegisterPage,
} from '@/constants/lazyload';
import type { RouteObject } from 'react-router-dom';
import SignupPage from '../features/auth/signup/page';

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'sign-up', element: <SignupPage /> },
      { path: 'log-in', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'setup-profile', element: <ProfileSetupPage /> },
    ],
  },
];
