import { LoginPage, ResetPasswordPage } from "@/constants/lazyload";
import { AuthPage, OtpPage, ForgotPasswordPage } from "@/constants/lazyload";

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
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  }
];

export default authRouter;
