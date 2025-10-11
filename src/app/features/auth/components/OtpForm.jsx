import Button from "@/components/ui/Button";
import OtpInput from "@/components/ui/OtpInput";
import { useOtpVerification } from "@/features/auth/hooks/useOtpVerification";
import { signupWithEmail } from "@/services/authService";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function OtpForm({
  // email = "nora@gmail.com",
  onVerifySuccess,
  onBackToSignup,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const password = location.state?.password;

  const {
    otpData,
    MAX_ATTEMPTS,
    updateOtpValue,
    setError,
    incrementAttempts,
    startResendTimer,
    verifyOtp,
    resendOtp,
    formatTimer,
  } = useOtpVerification(email);

  const {
    value: otpValue,
    attempts,
    hasError,
    errorMessage,
    isResendDisabled,
    resendTimer,
    isVerifying,
  } = otpData;

  // Send OTP automatically when component mounts
  useEffect(() => {
    const sendInitialOtp = async () => {
      try {
        toast.loading("Sending OTP code...", { id: "initial-otp" });
        await resendOtp();
        startResendTimer();
        toast.success("OTP sent successfully! Check your email.", {
          id: "initial-otp",
        });
      } catch (error) {
        console.error("Failed to send initial OTP:", error);
        toast.error("Failed to send OTP. Please try resending.", {
          id: "initial-otp",
        });
        setError("Failed to send OTP. Please try resending.");
      }
    };

    sendInitialOtp();
  }, [email]); // Only run when email changes

  const handleOtpChange = (value) => {
    updateOtpValue(value);
  };

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      toast.error("Please enter a complete 6-digit code.");
      return;
    }

    try {
      toast.loading("Verifying OTP code...", { id: "verify-otp" });
      const isValid = await verifyOtp(otpValue);

      if (isValid) {
        toast.success("OTP verified successfully!", { id: "verify-otp" });
        toast.loading("Creating your account...", { id: "signup" });

        const signupResponse = await signupWithEmail(email, password);

        if (signupResponse.code === 200 && signupResponse.success === 1) {
          toast.success("Signup successful! Redirecting...", { id: "signup" });
          onVerifySuccess?.();
          navigate("/setup-profile");
        } else {
          toast.error("Signup failed. Please try again.", { id: "signup" });
        }
      } else {
        toast.error("Invalid OTP code. Please try again.", {
          id: "verify-otp",
        });
        setError("Please enter the valid code.");
        incrementAttempts();

        const newAttempts = attempts + 1;
        if (newAttempts >= MAX_ATTEMPTS) {
          toast.error("Maximum attempts reached. Redirecting to signup...");
          setTimeout(() => {
            onBackToSignup?.();
          }, 1000);
        }
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.", {
        id: "verify-otp",
      });
      setError("Please enter the valid code.");
      incrementAttempts();
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;

    try {
      toast.loading("Resending OTP code...", { id: "resend-otp" });
      const success = await resendOtp();
      if (success) {
        startResendTimer();
        updateOtpValue("");
        toast.success("OTP resent successfully! Check your email.", {
          id: "resend-otp",
        });
      } else {
        toast.error("Failed to resend OTP. Please try again.", {
          id: "resend-otp",
        });
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      toast.error("Failed to resend OTP. Please try again.", {
        id: "resend-otp",
      });
      setError("Failed to resend OTP. Please try again.");
    }
  };

  if (attempts >= MAX_ATTEMPTS) {
    return (
      <div className="flex flex-col items-center gap-6 text-white">
        Route back to sign up page
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 ">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-400 text-lg">We send a code to {email}</p>
      </div>

      {/* OTP Input */}
      <div className="flex flex-col items-center gap-4">
        <OtpInput
          value={otpValue}
          onChange={handleOtpChange}
          onComplete={handleVerify}
          hasError={hasError}
          disabled={isVerifying}
        />
      </div>

      {/* Resend Code */}
      <div className="text-center flex items-center gap-2">
        <p
          className={`text-md ${
            hasError && errorMessage ? "text-red-400" : "text-gray-400"
          }`}
        >
          {hasError && errorMessage ? errorMessage : "Didn't receive OTP code?"}
        </p>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`text-sm cursor-pointer ${
            isResendDisabled
              ? "text-purple-400 opacity-50 cursor-not-allowed"
              : "text-purple-400 hover:text-purple-300"
          }`}
        >
          {isResendDisabled
            ? `Resend Code (${formatTimer(resendTimer)})`
            : "Resend Code"}
        </button>
      </div>

      {/* Verify Button */}
      <Button
        variant="primary"
        size="primary"
        onClick={handleVerify}
        disabled={otpValue.length !== 6 || isVerifying}
        className={`cursor-pointer${
          otpValue.length !== 6 || isVerifying
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isVerifying ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}

export default OtpForm;
