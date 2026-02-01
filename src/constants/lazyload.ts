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
  lazy(() => import('@/app/features/opom-register/page')),
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

export const IdeaPage = PageLoader(
  lazy(() => import('@/app/features/projects/page')),
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

export const PortfolioManagementPage = PageLoader(
  lazy(() => import('@/app/features/portfolio-management/page')),
);
export const IdeaManagementPage = PageLoader(
  lazy(
    () => import('@/app/features/idea-management/pages/idea-management-page'),
  ),
);

export const TimelineManagementPage = PageLoader(
  lazy(() => import('@/app/features/timeline-management/page.tsx')),
);

export const IdeaManagementEditPage = PageLoader(
  lazy(
    () =>
      import('@/app/features/idea-management/pages/idea-management-edit-page'),
  ),
);

export const UserManagement = PageLoader(
  lazy(() => import('@/app/features/user-management/pages/index')),
);

export const UserManagementViewDetail = PageLoader(
  lazy(
    () =>
      import('@/app/features/user-management/components/user-management-view-detail'),
  ),
);

export const AdminProfilePage = PageLoader(
  lazy(() => import('@/app/features/admin-profile/page.tsx')),
);

export const NotFoundPage = PageLoader(
  lazy(() => import('@/app/features/not-found')),
);
