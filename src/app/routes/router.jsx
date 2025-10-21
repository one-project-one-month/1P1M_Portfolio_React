import { createBrowserRouter } from "react-router-dom";
import {
  DevProfilePage,
  MainLayout, DevListPage,
  AdminLayout,
  RegisterListPage,
  ProjectCreateFormPage,
  ApprovedIdeasPage,
  LandingPage,
} from "../constants/lazyload";
import authRouter from "./authRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {index:true, element: <LandingPage />},
      { path: "setup-profile", element: <DevProfilePage /> },
      { path: "dev-list", element: <DevListPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <RegisterListPage /> },
      { path: "create-project", element: <ProjectCreateFormPage /> },
      { path: "approved-ideas", element: <ApprovedIdeasPage /> },
    ],
  },
  ...authRouter,
]);

export default router;
