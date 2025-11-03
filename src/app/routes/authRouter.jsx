import {
  OtpPage,
  LoginPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  RegisterPage,
  CheckPasswordOtpPage,
  OpomRegisterPage,
  AuthLayout,
  DevProfilePage,
} from "@/constants/lazyload";

const authRouter = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        index: true,
      },
      { path: "setup-profile", element: <DevProfilePage /> },
      {
        path: "register",
        element: <RegisterPage />,
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
    ],
  },
];

export default authRouter;
