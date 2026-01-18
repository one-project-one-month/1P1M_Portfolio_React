import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import {
  AdminLayout,
  ApprovedIdeaPage,
  DashboardPage,
  DeveloperPage,
  IdeaPage,
  PortfolioManagementPage,
  PortfolioPage,
} from '@/constants/lazyload';
import { createBrowserRouter } from 'react-router-dom';
import UserProfile from '../features/developers/components/user-profile';
import CreatePortfolioPage from '../features/portfolio-management/pages/create-portfolio';
import EditPortfolioPage from '../features/portfolio-management/pages/edit-portfolio';
import ViewPortfolioPage from '../features/portfolio-management/pages/view-portfolio';
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
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      {
        path: 'portfolio-management',
        element: <PortfolioManagementPage />,
      },
      {
        path: 'portfolio-management/create-portfolio',
        element: <CreatePortfolioPage />,
      },
      {
        path: 'portfolio-management/view-project-portfolio/:projectId',
        element: <ViewPortfolioPage />,
      },
      {
        path: 'portfolio-management/edit-portfolio/:projectId',
        element: <EditPortfolioPage />,
      },
    ],
  },

  ...authRoutes,
]);

export default router;
