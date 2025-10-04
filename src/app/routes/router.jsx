import { createBrowserRouter } from "react-router-dom";
import { DevProfilePage, MainLayout } from "../constants/lazyload";
import authRouter from "./authRouter";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {path:"setup-profile",
        element:<DevProfilePage/>}
    ],
  },
  ...authRouter,
]);

export default router;
