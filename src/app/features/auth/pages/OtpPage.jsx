import Background from '@/components/ui/Background';
import FormBackground from '@/components/ui/FormBackground';
import OtpForm from '@/features/auth/components/OtpForm';
import { signupWithEmail } from '@/services/authService';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

function OtpPage() {
  const navigate = useNavigate();
  
    const location = useLocation();
    const email = location.state?.email;
    const password = location.state?.password;

    const handleVerifySuccess = async() => {
      toast.success('OTP Verified Successfully!');
      
      if (password) {
        toast.dismiss();
        // Signup flow → redirect to login
        toast.loading("Creating your account...", { id: "signup" });
        const signupResponse = await signupWithEmail(email, password);

        if (signupResponse.code === 200 && signupResponse.success === 1) {
          toast.dismiss();
          toast.success("Signup successful! Redirecting...", { id: "signup" });
          navigate("/login");
        } else {
          toast.error(signupResponse.message || "Signup failed.", { id: "signup" });
        }

      } else {
        // Forgot password flow → redirect to reset password
        navigate('/reset-password', { state: { email } });
      }
  
  };


    const handleMaxAttempts = () => {
      toast.error('Too many failed attempts. Please try signing up again.');
      navigate('/register');
    };

  return (
    <Background className="min-h-screen flex items-center justify-center p-4">
      <FormBackground className="flex items-center justify-center" style={{ width: '600px', height: '400px' }}>
        <OtpForm
          email={email}
          onVerifySuccess={handleVerifySuccess}
          onMaxAttemptsExceeded={handleMaxAttempts}
        />
      </FormBackground>
    </Background>
  );
}

export default OtpPage;