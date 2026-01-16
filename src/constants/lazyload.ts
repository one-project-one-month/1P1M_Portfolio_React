import PageLoader from '@/components/page-loader';
import { lazy } from 'react';

export const MainLayout = PageLoader(
  lazy(() => import('@/components/layouts/main-layout')),
);

export const AuthLayout = PageLoader(
  lazy(() => import('@/components/layouts/auth-layout')),
);

export const PortfolioPage = PageLoader(
  lazy(() => import('@/app/features/portfolio/page')),
);

export const LoginPage = PageLoader(
  lazy(() => import('@/app/features/auth/login/page')),
);

export const RegisterPage = PageLoader(
  lazy(() => import('@/app/features/auth/register/page')),
);

export const ProfileSetupPage = PageLoader(
  lazy(() => import('@/app/features/auth/profile-setup/page')),
);

export const OpomRegisterPage = PageLoader(
  lazy(() => import('@/app/features/auth/opom-register/page')),
);

export const ForgotPasswordPage = PageLoader(
  lazy(() => import('@/app/features/auth/forgot-password/page')),
);

export const OtpPage = PageLoader(
  lazy(() => import('@/app/features/auth/otp/page')),
);

export const CheckPasswordOtpPage = PageLoader(
  lazy(() => import('@/app/features/auth/check-password-otp/page')),
);

export const ResetPasswordPage = PageLoader(
  lazy(() => import('@/app/features/auth/reset-password/page')),
);

export const DeveloperPage = PageLoader(
  lazy(() => import('@/app/features/developers/page')),
);

export const ApprovedIdeaPage = PageLoader(
  lazy(() => import('@/app/features/projects/approved/page')),
);

export const IdeaPage = PageLoader(
  lazy(() => import('@/app/features/projects/ideas/page')),
);

export const UserProfilePage = PageLoader(
  lazy(() => import('@/app/features/developers/components/user-profile')),
);

export const AdminLayout = PageLoader(
  lazy(() => import('@/components/layouts/admin-layout')),
);

export const DashboardPage = PageLoader(
  lazy(() => import('@/app/features/dashboard/page')),
);
export const IdeaManagementPage = PageLoader(
  lazy(() => import('@/app/features/idea-management/pages/index')),
);
