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
} from "../constants/lazyload";
import authRouter from "./authRouter";
import AddMemberPage from "@/features/user/pages/AddMemberPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "setup-profile", element: <DevProfilePage /> },
      { path: "dev-list", element: <DevListPage /> },
      { path: "ideas", element: <ProjectListPage /> },
      { path: "approved-ideas", element: <ApprovedIdeasPage /> },
      { path: "project-portfolio", element: <ProjectPortfolioList /> },
      { path: "add-member", element: <AddMemberPage/>}
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <RegisterListPage /> },
      { path: "create-project", element: <ProjectCreateFormPage /> },
      { path: "ideas", element: <ProjectListPageAdmin /> },
      { path: "setup-profile", element: <DevProfilePage /> },
      { path: "approved-ideas", element: <ApprovedIdeasPage /> },
    ],
  },
  ...authRouter,

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
