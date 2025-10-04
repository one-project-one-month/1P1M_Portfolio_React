import { LoginPage, RegisterPage } from "@/constants/lazyload";

const authRouter = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "auth/callback",
    element: <LoginPage />,
  },
  {
    path: "callback", // Google OAuth callback
    element: <LoginPage />,
  },
  {
    path: "login/oauth2/code/github",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
];

export default authRouter;
