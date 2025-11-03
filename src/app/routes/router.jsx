import { createBrowserRouter } from "react-router-dom";
import NotFound from "../features/auth/pages/NotFound";

import {
  DevProfilePage,
  MainLayout,
  DevListPage,
  AdminLayout,
  RegisterListPage,
  ProjectCreateFormPage,
  ProjectListPage,
  ProjectListPageAdmin,
  ApprovedIdeasPage,
  LandingPage,
  ProjectPortfolioList,
  ApprovedIdeasAdminPage,
  ProjectIdeaPage,
  AuthPage,
} from "../constants/lazyload";
import authRouter from "./authRouter";
import AddMemberPage from "@/features/user/pages/AddMemberPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "dev-list", element: <DevListPage /> },
      { path: "ideas", element: <ProjectListPage /> },
      { path: "approved-ideas", element: <ApprovedIdeasPage /> },
      { path: "project-portfolio", element: <ProjectPortfolioList /> },
      { path: "add-member", element: <AddMemberPage /> },
      { path: "create-project", element: <ProjectCreateFormPage /> },
      { path: "project-idea", element: <ProjectIdeaPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <RegisterListPage /> },
      { path: "ideas", element: <ProjectListPageAdmin /> },
      // { path: "setup-profile", element: <DevProfilePage /> },
      { path: "approved-ideas", element: <ApprovedIdeasAdminPage /> },
    ],
  },
  {
    path: "callback",
    element: <AuthPage />,
  },
  {
    path: "login/oauth2/code/github",
    element: <AuthPage />,
  },
  ...authRouter,

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
