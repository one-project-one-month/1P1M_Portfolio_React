import Background from '@/components/background';
import FormBackground from '@/components/ui/form-bg';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpForm from './components/otp-form';
import { signupWithEmail } from './services/api';

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;
  const password = (location.state as { password?: string })?.password;

  const handleVerifySuccess = async () => {
    toast.success('OTP Verified Successfully!');

    if (password) {
      toast.dismiss();
      toast.loading('Creating your account...', { id: 'signup' });
      const signupResponse = await signupWithEmail(email!, password);

      if (signupResponse.code === 200 && signupResponse.success) {
        toast.dismiss();
        toast.success('Signup successful! Redirecting...', { id: 'signup' });
        navigate('/auth/log-in');
      } else {
        toast.error(signupResponse.message || 'Signup failed.', {
          id: 'signup',
        });
      }
    } else {
      navigate('/auth/reset-password', { state: { email } });
    }
  };

  const handleMaxAttempts = () => {
    toast.error('Too many failed attempts. Please try signing up again.');
    navigate('/auth/register');
  };

  return (
    <Background className="min-h-screen flex items-center justify-center p-4">
      <FormBackground
        className="flex items-center justify-center"
        style={{ width: '600px', height: '400px' }}
      >
        <OtpForm
          email={email || ''}
          onVerifySuccess={handleVerifySuccess}
          onMaxAttemptsExceeded={handleMaxAttempts}
        />
      </FormBackground>
    </Background>
  );
}
