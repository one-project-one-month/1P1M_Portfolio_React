import PageLoader from "@/components/core/PageLoader";
import { lazy } from "react";

export const MainLayout = PageLoader(
  lazy(() => import("@/components/core/layouts/MainLayout"))
);

export const LoginPage = PageLoader(
  lazy(() => import("@/features/auth/pages/LoginPage"))
);

export const RegisterPage = PageLoader(
  lazy(() => import("@/features/auth/pages/RegisterPage"))
);
