import HomePage from '@/app/features/home/page';
import PersonProfilePage from '@/app/features/opom-management/pages/person-details';
import MainLayout from '@/components/layouts/main-layout';
import {
  AdminLayout,
  AdminProfilePage,
  DashboardPage,
  DeveloperPage,
  IdeaManagementPage,
  IdeaPage,
  MyProfilePage,
  NotFoundPage,
  PortfolioEditview,
  PortfolioFormview,
  PortfolioManagementPage,
  PortfolioPage,
  TimelineManagementPage,
  UserManagement,
  UserManagementViewDetail,
  UserProfilePage,
} from '@/constants/lazyload';
import { createBrowserRouter } from 'react-router-dom';
import AboutUsPage from '../features/about-us/page';
import ConfigurationPage from '../features/admin-configuration/page';
import OpomRegisteredPeopleList from '../features/opom-management/pages';
import OpomRegisterPage from '../features/opom-register/page';
import PortfolioErrorBoundary from '../features/portfolio-management/components/portfolio-error-boundary';
import CreatePortfolioPage from '../features/portfolio-management/pages/create-portfolio';
import EditPortfolioPage from '../features/portfolio-management/pages/edit-portfolio';
import ViewPortfolioPage from '../features/portfolio-management/pages/view-portfolio';
import { authRoutes } from './auth';
import ProtectedGuard from './guards/protected-guard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <PortfolioErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      { path: '/portfolios', element: <PortfolioPage /> },
      { path: '/developers', element: <DeveloperPage /> },
      { path: 'profile/:userId', element: <UserProfilePage /> },
      { path: '/about-us', element: <AboutUsPage /> },
      { path: '/me', element: <MyProfilePage /> },
      { path: '/ideas', element: <IdeaPage /> },
      { path: 'opom-register', element: <OpomRegisterPage /> },
      {
        element: <ProtectedGuard allow={['USER', 'ADMIN']} />,
        children: [
          { path: '/portfolios', element: <PortfolioPage /> },
          { path: '/developers', element: <DeveloperPage /> },
          { path: 'profile/:username', element: <UserProfilePage /> },
          { path: '/about-us', element: <AboutUsPage /> },
          { path: '/me', element: <MyProfilePage /> },
          { path: '/ideas', element: <IdeaPage /> },
          { path: 'opom-register', element: <OpomRegisterPage /> },
          {
            path: '/portfolios/create-portfolio',
            element: <PortfolioFormview />,
          },
          {
            path: '/portfolios/edit-portfolio/:projectId',
            element: <PortfolioEditview />,
          },
        ],
      },
    ],
  },

  {
    path: '/admin',

    element: <ProtectedGuard allow={['ADMIN']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { element: <DashboardPage />, index: true },
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
          { path: 'idea-management', element: <IdeaManagementPage /> },
          { path: 'user-management', element: <UserManagement /> },

          {
            path: 'user-management/view-details/:userId',
            element: <UserManagementViewDetail />,
          },

          { path: 'timeline-management', element: <TimelineManagementPage /> },
          { path: 'admin-profile', element: <AdminProfilePage /> },
          {
            path: 'opom-registered-people-list',
            element: <OpomRegisteredPeopleList />,
          },
          {
            path: 'opom-registered-people-list/user-profile/:id',
            element: <PersonProfilePage />,
          },
          {
            path: 'configuration',
            element: <ConfigurationPage />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },

  ...authRoutes,
]);

export default router;
