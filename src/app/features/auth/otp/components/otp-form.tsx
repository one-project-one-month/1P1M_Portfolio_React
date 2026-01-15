import { Button } from '@/components/ui/button';
import OtpInput from '@/components/ui/otp-input';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useOtpVerification } from '../hooks/use-otp-verification';

interface OtpFormProps {
  email: string;
  onVerifySuccess?: () => void;
  onMaxAttemptsExceeded?: () => void;
  onBackToSignup?: () => void;
}

export default function OtpForm({
  email,
  onVerifySuccess,
  onMaxAttemptsExceeded,
  onBackToSignup,
}: OtpFormProps) {
  if (!email) {
    throw new Error('Email is required for OTP verification');
  }

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

  const handleOtpChange = (value: string) => {
    updateOtpValue(value);
  };

  useEffect(() => {
    startResendTimer();
  }, [startResendTimer]);

  const handleVerify = async () => {
    if (otpValue.length !== 6)
      return toast.error('Please enter a complete 6-digit code.');

    try {
      toast.loading('Verifying OTP code...', { id: 'verify-otp' });
      const isValid = await verifyOtp(otpValue);

      if (isValid) {
        toast.dismiss();
        onVerifySuccess?.();
      } else {
        incrementAttempts();
        if (attempts + 1 >= MAX_ATTEMPTS) {
          onMaxAttemptsExceeded?.();
        }
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.', {
        id: 'verify-otp',
      });
      setError('Please enter the valid code.');
      incrementAttempts();
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;

    try {
      toast.loading('Resending OTP code...', { id: 'resend-otp' });
      const success = await resendOtp();
      if (success) {
        startResendTimer();
        updateOtpValue('');
        toast.success('OTP resent successfully! Check your email.', {
          id: 'resend-otp',
        });
      } else {
        toast.error('Failed to resend OTP. Please try again.', {
          id: 'resend-otp',
        });
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      toast.error('Failed to resend OTP. Please try again.', {
        id: 'resend-otp',
      });
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 ">
      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-400 text-lg">We send a code to {email}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <OtpInput
          value={otpValue}
          onChange={handleOtpChange}
          onComplete={handleVerify}
          hasError={hasError}
          disabled={isVerifying}
        />
      </div>

      <div className="text-center flex items-center gap-2">
        <p
          className={`text-md ${
            hasError && errorMessage ? 'text-red-400' : 'text-gray-400'
          }`}
        >
          {hasError && errorMessage ? errorMessage : "Didn't receive OTP code?"}
        </p>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`text-sm cursor-pointer ${
            isResendDisabled
              ? 'text-purple-400 opacity-50 cursor-not-allowed'
              : 'text-purple-400 hover:text-purple-300'
          }`}
        >
          {isResendDisabled
            ? `Resend Code (${formatTimer(resendTimer)})`
            : 'Resend Code'}
        </button>
      </div>

      <Button
        variant="primary"
        size="primary"
        onClick={handleVerify}
        disabled={otpValue.length !== 6 || isVerifying}
        className={`cursor-pointer ${
          otpValue.length !== 6 || isVerifying
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {isVerifying ? 'Verifying...' : 'Verify'}
      </Button>
    </div>
  );
}
