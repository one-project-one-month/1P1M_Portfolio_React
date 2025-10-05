<<<<<<< Updated upstream
import { AuthPage } from "@/constants/lazyload";
import {LoginPage } from "@/constants/lazyload";
=======
import { AuthPage, OtpPage } from "@/constants/lazyload";

>>>>>>> Stashed changes

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
  {
    path: "otp-verify",
    element: <OtpPage />,
  },
];

export default authRouter;
