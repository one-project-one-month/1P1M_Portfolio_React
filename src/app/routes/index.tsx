import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import { createBrowserRouter } from 'react-router-dom';
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
    ],
  },

  ...authRoutes,
]);

export default router;
