import React, { useState } from "react";
import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { checkEmailExists, forgotPassword } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();





  const handleContinue = async () => {
    const emailExists = await checkEmailExists(email);
    
    setLoading(true);

    if(emailExists?.data){
      try {

        const res = await forgotPassword(email);
        if(res.code === 200 && res.success === 1){
          toast.success("OTP resent successfully! Check your email.", {id: "resend-otp",});
          navigate("/otp-verify", { state: { email } });
        }

      } catch (error) {
        console.error("Error during password forgot:", error);
      } finally {
        setLoading(false);
      }
    }else{
      toast.error("Email not in our system! Please register first")
      navigate("/register",{ state: { email } });

    }


  };

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="flex items-center justify-around flex-col">
        {/* Heading */}
        <div className="text-white">
          <h1 className="font-sans font-bold text-2xl leading-8 mb-2">
            Forgot Password
          </h1>
          <p className="font-sans text-sm text-[#99A1AF] w-full text-center">
            Enter your email and we will send <br />
            code to reset password.
          </p>
        </div>

        {/* Form Fields */}
        <div className="w-[404px] h-[140px] px-6 flex items-center justify-between flex-col">
          <div className="w-full relative">
            <TextField
              label="Email"
              id="email"
              name="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(value) => setEmail(value)}
              showEditButton={false}
              error= {emailError}
              className="relative w-full text-white font-sans text-sm font-semibold leading-8"
            />
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            variant="primary"
            size="primary"
            className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-1"
          >
            {loading ? "Processing..." : "Continue"}
          </Button>

        </div>
        <div className="mt-6 py-4 flex text-sm text-[#99A1AF]">
          <a href="/login" className="flex text-center cursor-pointer block">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </a>
        </div>
      </FormBackground>
    </Background >
  )
}

export default ForgotPasswordPage;