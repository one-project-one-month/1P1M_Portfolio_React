import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../constants/lazyload";
import authRouter from "./authRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
  ...authRouter,
]);

export default router;
