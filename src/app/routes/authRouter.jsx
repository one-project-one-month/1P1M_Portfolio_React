import { AuthPage } from "@/constants/lazyload";

const authRouter = [
  {
    path: "login",
    element: <div>Login Page</div>,
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
