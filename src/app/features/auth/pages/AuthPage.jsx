import React from "react";
import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import AuthForm from "@/features/auth/components/AuthForm";

function AuthPage() {
  return (
    <Background>
      <div className="flex items-center justify-center h-screen">
        <FormBackground>
          <AuthForm />
        </FormBackground>
      </div>
    </Background>
  );
}

export default AuthPage;
