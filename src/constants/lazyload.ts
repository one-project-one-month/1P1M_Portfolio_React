import PageLoader from '@/components/page-loader';
import { lazy } from 'react';

export const MainLayout = PageLoader(
  lazy(() => import('@/components/layouts/main-layout'))
);



export const PortfolioPage=PageLoader(
  lazy(()=>import('@/app/features/portfolio/page'))
)


export  const DeveloperPage=PageLoader(
  lazy(()=>import('@/app/features/developers/page'))
)


export const ApprovedIdeaPage=PageLoader(
  lazy(()=>import('@/app/features/projects/approved/page'))
)


export const IdeaPage=PageLoader(
  lazy(()=>import('@/app/features/projects/ideas/page'))
)
