import { AuthPage, OtpPage, LoginPage, ResetPasswordPage, ForgotPasswordPage, RegisterPage } from "@/constants/lazyload";
import DevListPage from "../features/user/pages/DevListPage";


const authRouter = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
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
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "user",
    children: [
      {
        path: "dev-list", // Final path: /user/dev-list
        element: <DevListPage />
      },
    ]

  }
];

export default authRouter;
