import { createBrowserRouter } from "react-router-dom";
import { DevProfilePage, MainLayout,AdminLayout,RegisterListPage,ProjectListPage,ProjectCreateFormPage } from "../constants/lazyload";


import authRouter from "./authRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "setup-profile", element: <DevProfilePage /> },
      { path: "ideas", element: <ProjectListPage /> },
    ],
  },
  {path:"/admin",
    element:<AdminLayout/>,
      children: [
        { index: true, element: <RegisterListPage /> },
        { path: "create-project", element: <ProjectCreateFormPage /> },
        { path: "ideas", element: <ProjectListPage /> },

    ],
  },
  ...authRouter,
]);

export default router;
