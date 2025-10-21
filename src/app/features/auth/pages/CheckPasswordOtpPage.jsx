import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import OtpForm from "../components/OtpForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function CheckPasswordOtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get email from URL parameters
  const email = searchParams.get("email") || "user@example.com";

  const handleVerifySuccess = () => {
    // Navigate to dashboard or next step
    toast.success("🎉 OTP Verified Successfully! Proceed to reset your password.");
    navigate("/password-reset");
  };

  const handleBackToSignup = () => {
    navigate("/register");
  };

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="!w-[500px] flex items-center justify-around flex-col">
        <OtpForm
          email={email}
          onVerifySuccess={handleVerifySuccess}
          onBackToSignup={handleBackToSignup}
        />
      </FormBackground>
    </Background>
  );
}

export default CheckPasswordOtpPage;