import { createBrowserRouter } from "react-router-dom";
import {
  DevProfilePage,
  MainLayout, DevListPage,
  AdminLayout,
  RegisterListPage,
  ProjectCreateFormPage,
  ProjectListPage,
  ProjectListPageAdmin,
} from "../constants/lazyload";
import authRouter from "./authRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "setup-profile", element: <DevProfilePage /> },
    { path: "dev-list", element: <DevListPage /> },
      { path: "ideas", element: <ProjectListPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "setup-profile", element: <DevProfilePage /> },
    ],
  },
  {path:"/admin",
    element:<AdminLayout/>,
      children: [
        { index: true, element: <RegisterListPage /> },
        { path: "create-project", element: <ProjectCreateFormPage /> },
        { path: "ideas", element: <ProjectListPageAdmin /> },

    ],
  },
  ...authRouter,
]);

export default router;
