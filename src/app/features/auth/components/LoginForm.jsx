import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import FormBackground from "../../../components/ui/FormBackground";
import TextField from "@/components/ui/TextField";       // ⬅️ use TextField
import PasswordField from "@/components/ui/PasswordField"; // ⬅️ use PasswordField
import { useLocation } from "react-router-dom";

function LoginForm() {
  const [password, setPassword] = useState("");
  
 const location = useLocation();
  const emailFromAuth = location.state?.email || "";

  return (

      <>
        <FormBackground className="flex items-center justify-around flex-col w-full h-full">
          {/* Heading */}
          <div className="text-white">
            <h1 className="font-sans font-bold text-2xl leading-8 mb-2">
              Sign In To Your Account
            </h1>
            <p className="font-sans text-sm text-[#99A1AF] w-full text-center mb-4">
              Subtitle
            </p>
          </div>

          {/* Form Fields */}
          <div className="w-[404px] h-[260px] flex flex-col justify-around">
            {/* Email */}
            <div className="-mb-8">
              <TextField
                label="Email"
                id="email"
                name="email"
                placeholder="Enter your email here"
                value={emailFromAuth}
                onChange={(e) => setEmail(e.target.value)}
                className='relative w-full text-white font-sans text-sm font-semibold leading-8'
              />
            </div>

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

            {/* Login Button */}
            <Button
              variant="primary"
              size="primary"
              className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
            >
              Login
            </Button>
          </div>

          {/* Forgot password */}
          <a
            href="#"
            className="font-sans text-sm text-[#99A1AF] w-full text-center font-semibold mt-4"
          >
            Forget password?
          </a>
        </FormBackground>
      </>
  );
}

export default LoginForm;
