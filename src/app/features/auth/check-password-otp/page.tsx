import Background from '@/components/background';
import FormBackground from '@/components/ui/form-bg';
import OtpForm from '../otp/components/otp-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckPasswordOtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email') || 'user@example.com';

  const handleVerifySuccess = () => {
    toast.success(
      '🎉 OTP Verified Successfully! Proceed to reset your password.',
    );
    navigate('/auth/reset-password', { state: { email } });
  };

  const handleBackToSignup = () => {
    navigate('/auth/register');
  };

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="flex items-center justify-around flex-col">
        <OtpForm
          email={email}
          onVerifySuccess={handleVerifySuccess}
          onBackToSignup={handleBackToSignup}
        />
      </FormBackground>
    </Background>
  );
}
