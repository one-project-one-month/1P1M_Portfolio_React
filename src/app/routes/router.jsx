import { createBrowserRouter } from "react-router-dom";
import NotFound from "../features/auth/pages/NotFound";


import {
  DevProfilePage,
  MainLayout, DevListPage,
  AdminLayout,
  RegisterListPage,
  ProjectCreateFormPage,
  ApprovedIdeasPage,
} from "../constants/lazyload";
import authRouter from "./authRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "setup-profile", element: <DevProfilePage /> },
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

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
