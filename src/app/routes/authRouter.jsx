import { LoginPage } from "@/constants/lazyload";

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
    path: "login/oauth2/code/github",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <div>Hello register</div>,
  },
];

export default authRouter;
