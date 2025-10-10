import React, { useState } from "react";
import PasswordField from "@/components/ui/PasswordField";
import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import Button from "@/components/ui/Button";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="flex items-center justify-around flex-col">
        {/* Heading */}
        <div className="text-white">
          <h1 className="font-sans font-bold text-2xl leading-8 mb-2">
            Reset Password
          </h1>
        </div>

        {/* Form Fields */}
        <div className="w-[404px] h-[260px] flex flex-col justify-around">
          {/* Password */}
          <div className="-mb-8">
            <PasswordField
              label="Password"
              id="password"
              name="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="-mb-8">
            <PasswordField
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter your password here"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="w-full">
            <Button
              variant="primary"
              size="primary"
              className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
            >
              Update Password
            </Button>
          </div>
        </div>
      </FormBackground>
    </Background>
  )
}

export default ResetPasswordPage;