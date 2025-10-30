import React from "react";
import Background from "@/components/ui/Background";
import ResetPasswordForm from "../components/ResetPasswordForm";
import FormBackground from "@/components/ui/FormBackground";

function ResetPasswordPage() {
  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className='h-auto shadow shadow-[#fff]/20'>
        <ResetPasswordForm></ResetPasswordForm>
      </FormBackground>
    </Background>
  )
}

export default ResetPasswordPage;