import {
  AuthLayout,
  CheckPasswordOtpPage,
  ForgotPasswordPage,
  LoginPage,
  OtpPage,
  ProfileSetupPage,
  RegisterPage,
  ResetPasswordPage,
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
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'otp-verify', element: <OtpPage /> },
      { path: 'check-password-otp', element: <CheckPasswordOtpPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },

  {
    path: '/login/oauth2/code/github',
    element: <SignupPage />,
  },
];
