import HomePage from '@/app/features/home/page';
import MainLayout from '@/components/layouts/main-layout';
import {
  AdminLayout,
  AdminProfilePage,
  DashboardPage,
  DeveloperPage,
  IdeaManagementEditPage,
  IdeaManagementPage,
  IdeaPage,
  MyProfilePage,
  NotFoundPage,
  PortfolioManagementPage,
  PortfolioPage,
  TimelineManagementPage,
  UserManagement,
  UserManagementViewDetail,
} from '@/constants/lazyload';
import { createBrowserRouter } from 'react-router-dom';
import AboutUsPage from '../features/about-us/page';
import UserProfile from '../features/developers/components/user-profile';
import OpomRegisteredPeopleList from '../features/opom-management/pages';
import PersonProfilePage from '../features/opom-management/pages/person-details';
import OpomRegisterPage from '../features/opom-register/page';
import PortfolioErrorBoundary from '../features/portfolio-management/components/portfolio-error-boundary';
import CreatePortfolioPage from '../features/portfolio-management/pages/create-portfolio';
import EditActivityPage from '../features/portfolio-management/pages/edit-activity';
import EditPortfolioPage from '../features/portfolio-management/pages/edit-portfolio';
import ViewPortfolioPage from '../features/portfolio-management/pages/view-portfolio';
import PortfolioEditview from '../features/portfolio/components/portfolio-edit-view';
import PortfolioFormview from '../features/portfolio/components/portfolio-form-view';
import { authRoutes } from './auth';

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
      { path: '/portfolio/create-portfolio', element: <PortfolioFormview /> },
      {
        path: '/portfolio/update-portfolio/:projectId',
        element: <PortfolioEditview />,
      },
      { path: 'opom-register', element: <OpomRegisterPage /> },
      {
        path: '/developers',
        element: <DeveloperPage />,
      },

      { path: '/me', element: <MyProfilePage /> },
      { path: '/ideas', element: <IdeaPage /> },
      { path: 'profile/:username', element: <UserProfile /> },
      { path: '/about us', element: <AboutUsPage /> },
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
        errorElement: <PortfolioErrorBoundary />,
      },
      {
        path: 'portfolio-management/create-portfolio',
        element: <CreatePortfolioPage />,
        errorElement: <PortfolioErrorBoundary />,
      },
      {
        path: 'portfolio-management/view-project-portfolio/:projectId',
        element: <ViewPortfolioPage />,
        errorElement: <PortfolioErrorBoundary />,
      },
      {
        path: 'portfolio-management/edit-portfolio/:projectId',
        element: <EditPortfolioPage />,
        errorElement: <PortfolioErrorBoundary />,
      },
      {
        path: 'portfolio-management/edit-activity/:projectId',
        element: <EditActivityPage />,
        errorElement: <PortfolioErrorBoundary />,
      },
      { path: 'idea-management', element: <IdeaManagementPage /> },
      {
        path: 'idea-management/portfolio/import',
        element: <IdeaManagementEditPage />,
      },

      { path: 'user-management', element: <UserManagement /> },
      {
        path: 'register-user/view-detail',
        element: <UserManagementViewDetail />,
      },

      { path: 'timeline-management', element: <TimelineManagementPage /> },
      { path: 'admin-profile', element: <AdminProfilePage /> },
      {
        path: 'opom-registered-people-list',
        element: <OpomRegisteredPeopleList />,
      },
      {
        path: 'opom-registered-people-list/:id',
        element: <PersonProfilePage />,
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
