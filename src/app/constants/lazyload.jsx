import PageLoader from "@/components/core/PageLoader";
import { lazy } from "react";

export const MainLayout = PageLoader(
  lazy(() => import("@/components/core/layouts/MainLayout"))
);

export const AuthPage = PageLoader(
  lazy(() => import("@/features/auth/pages/AuthPage"))
);
