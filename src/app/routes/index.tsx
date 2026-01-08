import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './auth';
import { ApprovedIdeaPage, DeveloperPage, IdeaPage, PortfolioPage } from '@/constants/lazyload';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {path:"/portfolio",
        element:<PortfolioPage />
      },
      {
        path:"/developers",
        element:<DeveloperPage />
      },
      {path:"/approved-ideas",
        element:<ApprovedIdeaPage />
      },
      {path:"/ideas",
        element:<IdeaPage />
      }
    ],
  },

  ...authRoutes,
]);

export default router;
