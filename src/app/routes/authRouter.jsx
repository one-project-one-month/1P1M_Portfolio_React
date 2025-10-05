import { AuthPage } from "@/constants/lazyload";
import {LoginPage } from "@/constants/lazyload";

const authRouter = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "auth/callback",
    element: <AuthPage />,
  },
  {
    path: "callback",
    element: <AuthPage />,
  },
  {
    path: "login/oauth2/code/github",
    element: <AuthPage />,
  },
];

export default authRouter;
