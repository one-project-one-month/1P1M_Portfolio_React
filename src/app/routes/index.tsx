import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import {
<<<<<<< HEAD
  ApprovedIdeaPage,
=======
  AdminLayout,
  ApprovedIdeaPage,
  DashboardPage,
>>>>>>> 010864a5417c85890ac83db5ba68b65a08b48cff
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
<<<<<<< HEAD
=======
      { path: '/portfolio/create-portfolio', element: <PortfolioFormview /> },
>>>>>>> 010864a5417c85890ac83db5ba68b65a08b48cff
      {
        path: '/developers',
        element: <DeveloperPage />,
      },
      { path: '/approved-ideas', element: <ApprovedIdeaPage /> },
      { path: '/ideas', element: <IdeaPage /> },
<<<<<<< HEAD
=======
      { path: 'profile/:username', element: <UserProfile /> },
>>>>>>> 010864a5417c85890ac83db5ba68b65a08b48cff
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
