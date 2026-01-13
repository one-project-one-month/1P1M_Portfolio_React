import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import {
 
  AdminLayout,
  ApprovedIdeaPage,
  DashboardPage,
  DeveloperPage,
  IdeaPage,
  PortfolioPage,
} from '@/constants/lazyload';
import { createBrowserRouter } from 'react-router-dom';
import UserProfile from '../features/developers/components/user-profile';
import PortfolioFormview from '../features/portfolio/components/portfolio-form-view';
import { authRoutes } from './auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      { path: '/portfolio', element: <PortfolioPage /> },
      { path: '/portfolio/create-portfolio', element: <PortfolioFormview /> },
      {
        path: '/developers',
        element: <DeveloperPage />,
      },
      { path: '/approved-ideas', element: <ApprovedIdeaPage /> },
      { path: '/ideas', element: <IdeaPage /> },
      { path: 'profile/:username', element: <UserProfile /> },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [{ path: 'dashboard', element: <DashboardPage /> }],
  },

  ...authRoutes,
]);

export default router;
