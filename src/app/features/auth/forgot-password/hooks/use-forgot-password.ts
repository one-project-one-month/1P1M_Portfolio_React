import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkEmailExists } from '../../register/services/api';
import { forgotPassword } from '../services/api';

export function useForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    setLoading(true);

    try {
      const emailExists = await checkEmailExists(email);

      if (emailExists?.data) {
        const res = await forgotPassword(email);
        if (res.code === 200 && res.success) {
          toast.success('OTP resent successfully! Check your email.', {
            id: 'resend-otp',
          });
          navigate('/auth/otp-verify', { state: { email } });
        }
      } else {
        toast.error('Email not in our system! Please register first');
        navigate('/auth/register', { state: { email } });
      }
    } catch (error) {
      console.error('Error during password forgot:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    emailError,
    setEmailError,
    loading,
    handleContinue,
  };
}
