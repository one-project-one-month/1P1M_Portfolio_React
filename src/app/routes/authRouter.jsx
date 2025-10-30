import {
  AuthPage,
  OtpPage,
  LoginPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  RegisterPage,
  CheckPasswordOtpPage,
  OpomRegisterPage,
} from "@/constants/lazyload";

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
    path: "check-password-otp",
    element: <CheckPasswordOtpPage />,
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
    path: "opom-register",
    element: <OpomRegisterPage />,
  },
];

export default authRouter;
