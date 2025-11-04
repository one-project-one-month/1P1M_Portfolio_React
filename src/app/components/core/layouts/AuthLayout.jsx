import Background from "@/components/ui/Background";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Background>
      <div className="w-screen h-screen">
        <Outlet/>
      </div>
    </Background>
  );
};

export default AuthLayout;
