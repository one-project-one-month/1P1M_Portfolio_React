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

export const AdminLayout=PageLoader(
  lazy(()=>import('@/components/layouts/admin-layout'))
)

export const DashboardPage=PageLoader(
  lazy(()=>import('@/app/features/dashboard/page'))
)
