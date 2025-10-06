import PageLoader from "../components/core/PageLoader";
import { lazy } from "react";

export const MainLayout = PageLoader(
  lazy(() => import("../components/core/layouts/MainLayout"))
);

export const AuthPage = PageLoader(
  lazy(() => import("@/features/auth/pages/AuthPage"))
);

export const LoginPage = PageLoader(
  lazy(() => import("@/features/auth/pages/LoginPage"))
);

export const DevProfilePage = lazy(() =>
  import("../features/auth/pages/DevProfilePage")
);


export const OtpPage = PageLoader(
  lazy(() => import("@/features/auth/pages/OtpPage"))
)

export const AdminLayout=PageLoader(
  lazy(()=>import("@/components/core/layouts/AdminLayout"))
)

export const RegisterListPage=PageLoader(
  lazy(()=>import("@/features/admin/pages/RegisterListPage"))
)