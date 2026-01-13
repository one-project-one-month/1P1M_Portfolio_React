import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../services/api';

export function useResetPassword() {
  const [passwordError, setPasswordError] = useState('');
  const [cmfPasswordError, setCmfPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordRestted, setPasswordRestted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;

  const passwordRef = useRef<HTMLInputElement>(null);
  const cfmpasswordRef = useRef<HTMLInputElement>(null);

  const isStrongPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = passwordRef.current?.value.trim() || '';
    const confirmPassword = cfmpasswordRef.current?.value.trim() || '';

    setPasswordError('');
    setCmfPasswordError('');

    let valid = true;

    if (!password) {
      setPasswordError('Enter your Password');
      valid = false;
    } else if (!isStrongPassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters, include upper/lowercase, number, and symbol.',
      );
      valid = false;
    }

    if (!confirmPassword) {
      setCmfPasswordError('Confirm your Password');
      valid = false;
    } else if (confirmPassword !== password) {
      setCmfPasswordError('Passwords do not match');
      valid = false;
    }

    if (!email) {
      toast.error('Session expired or email not found. Please start over.');
      navigate('/auth/forgot-password');
      return;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const response = await resetPassword(email, password);
      if (response.success || response.code === 200) {
        toast.success('Password updated successfully! Please log in.', {
          id: 'reset-password',
        });
        setPasswordRestted(true);
      } else {
        toast.error(
          response.message || 'Failed to reset password. Please try again.',
          { id: 'reset-password' },
        );
      }
    } catch (error) {
      const err = error as Error;
      toast.error(
        err.message || 'Failed to reset password. Please try again.',
        { id: 'reset-password' },
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/auth/log-in');
  };

  return {
    passwordRef,
    cfmpasswordRef,
    passwordError,
    cmfPasswordError,
    loading,
    passwordRestted,
    handlePasswordReset,
    handleContinue,
  };
}
