import React from "react";
import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import RegisterForm from "@/features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <Background>
      <div className="flex items-center justify-center h-screen px-8">
        <div className="flex gap-16 w-full max-w-6xl">
          {/* Left Side - Join With Us */}
          <div className="flex-1 flex flex-col justify-center text-white">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-4">Join With Us</h1>
              <p className="text-lg text-white/80 mb-12">
                Complete these steps to complete your profile
              </p>

              <div className="space-y-4">
                {/* Step 1 - Active */}
                <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-semibold text-sm">1</span>
                  </div>
                  <span className="text-white font-medium">
                    Register your account
                  </span>
                </div>

                {/* Step 2 - Inactive */}
                <div className="flex items-center gap-4 bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white/60 font-semibold text-sm">
                      2
                    </span>
                  </div>
                  <span className="text-white/60 font-medium">
                    Set up your profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="flex-shrink-0">
            <FormBackground>
              <RegisterForm />
            </FormBackground>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default RegisterPage;
