import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import {
  ApprovedIdeaPage,
  DeveloperPage,
  IdeaPage,
  PortfolioPage,
} from '@/constants/lazyload';
import { createBrowserRouter } from 'react-router-dom';
import UserProfile from '../features/developers/UserProfile';
import { authRoutes } from './auth';
import PortfolioFormview from '../features/portfolio/components/portfolio-form-view';

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
      {path:'/portfolio/create-portfolio',element:<PortfolioFormview />},
      {
        path: '/developers',
        element: <DeveloperPage />,
      },
      { path: '/approved-ideas', element: <ApprovedIdeaPage /> },
      { path: '/ideas', element: <IdeaPage /> },
      { path: 'profile/:username', element: <UserProfile /> },
    ],
  },

  ...authRoutes,
]);

export default router;
