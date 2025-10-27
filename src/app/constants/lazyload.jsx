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

export const RegisterPage = PageLoader(
  lazy(() => import("@/features/auth/pages/RegisterPage"))
);

export const DevProfilePage = lazy(() =>
  import("../features/auth/pages/DevProfilePage")
);

export const OtpPage = PageLoader(
  lazy(() => import("@/features/auth/pages/OtpPage"))
);

export const ForgotPasswordPage = PageLoader(
  lazy(() => import("@/features/auth/pages/ForgotPasswordPage"))
);

export const CheckPasswordOtpPage = PageLoader(
  lazy(() => import("@/features/auth/pages/CheckPasswordOtpPage"))
);

export const ResetPasswordPage = PageLoader(
  lazy(() => import("@/features/auth/pages/ResetPasswordPage"))
);

export const AdminLayout = PageLoader(
  lazy(() => import("@/components/core/layouts/AdminLayout"))
);

export const RegisterListPage = PageLoader(
  lazy(() => import("@/features/admin/pages/RegisterListPage"))
);

export const ProjectListPage=PageLoader(
  lazy(()=>import("@/features/auth/pages/ProjectIdeaListPage"))
)

export const ProjectListPageAdmin = PageLoader(
  lazy(() => import("@/features/admin/pages/ProjectListPageAdmin"))
);

export const ProjectCreateFormPage = PageLoader(
  lazy(() => import("@/features/admin/pages/ProjectCreateFormPage"))
);

export const ApprovedIdeasPage = PageLoader(
  lazy(() => import("@/features/user/pages/ApprovedProjectIdeasPage"))
);
export const ApprovedIdeasAdminPage = PageLoader(
  lazy(() => import("@/features/admin/pages/ApprovedProjectIdeasAdminPage"))
);

export const LandingPage = PageLoader(
  lazy(() => import("@/features/user/pages/LandingPage"))
);

export const DevListPage = lazy(() =>
  import("../features/user/pages/DevListPage")
);

export const ProjectPortfolioList = lazy(() =>
  import("@/features/auth/pages/ProjectPortfolioList")
);
