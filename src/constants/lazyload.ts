import PageLoader from "@/components/core/hoc/page-loader";
import { lazy } from "react";


export const MainLayout=PageLoader(
    lazy(()=>import("@/components/core/layout/main-layout"))
)