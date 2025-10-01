import React from "react";
import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import LoginForm from "@/features/auth/components/LoginForm";

function LoginPage() {
  return (
    <Background>
      <div className="flex items-center justify-center h-screen">
        <FormBackground>
          <LoginForm />
        </FormBackground>
      </div>
    </Background>
  );
}

export default LoginPage;
