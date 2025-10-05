import Background from '@/components/ui/Background';
import FormBackground from '@/components/ui/FormBackground';
import OtpForm from '@/features/auth/components/OtpForm';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get email from URL parameters
  const email = searchParams.get('email') || 'user@example.com';

  const handleVerifySuccess = () => {
    toast.success('🎉 OTP Verified Successfully! Welcome!');
    // Navigate to dashboard or next step
    navigate('/setup-profile');
  };

  const handleBackToSignup = () => {
    toast.error('Too many failed attempts. Please try signing up again.');
    navigate('/register');
  };

  return (
    <Background className="min-h-screen flex items-center justify-center p-4">
      <FormBackground className="flex items-center justify-center" style={{ width: '600px', height: '400px' }}>
        <OtpForm
          email={email}
          onVerifySuccess={handleVerifySuccess}
          onBackToSignup={handleBackToSignup}
        />
      </FormBackground>
    </Background>
  );
}

export default OtpPage;